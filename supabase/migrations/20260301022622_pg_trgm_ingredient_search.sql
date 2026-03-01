-- =============================================================================
-- Domain B: pg_trgm Fuzzy Ingredient Search (Primary Retrieval)
-- Source of Truth: Raw SQL (DO NOT generate with drizzle-kit)
--
-- Strategy: pg_trgm trigram matching is the PRIMARY ingredient lookup.
-- pgvector semantic search (01-02 migration) is the FALLBACK for true
-- synonyms that trigram can't catch.
-- =============================================================================

SET search_path TO public, extensions;

-- -----------------------------------------------------------------------------
-- 1. Enable pg_trgm extension
-- -----------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA extensions;

-- -----------------------------------------------------------------------------
-- 2. search_text column exists via Drizzle schema (20260228155000_add_search_columns)
-- -----------------------------------------------------------------------------

-- Populate search_text for existing rows
UPDATE public.vietnamese_food_composition
SET search_text = name_primary
  || COALESCE(' ' || array_to_string(name_alt, ' '), '')
  || ' ' || name_en
WHERE search_text IS NULL;

-- Trigger to auto-populate search_text on insert/update
CREATE OR REPLACE FUNCTION public.build_food_search_text()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_text := NEW.name_primary
    || COALESCE(' ' || array_to_string(NEW.name_alt, ' '), '')
    || ' ' || NEW.name_en;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_food_composition_search_text
  BEFORE INSERT OR UPDATE OF name_primary, name_alt, name_en
  ON public.vietnamese_food_composition
  FOR EACH ROW
  EXECUTE FUNCTION public.build_food_search_text();

-- -----------------------------------------------------------------------------
-- 3. GIN trigram index on search_text for fast fuzzy lookups
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_food_composition_trgm
  ON public.vietnamese_food_composition
  USING gin (search_text gin_trgm_ops);

-- -----------------------------------------------------------------------------
-- 4. Primary search function: fuzzy_match_ingredients
--    Returns top-N candidates by trigram similarity.
--    Use this FIRST. Fall back to match_ingredients (pgvector) if no results
--    meet the threshold.
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.fuzzy_match_ingredients(
  query_text text,
  match_count int DEFAULT 5,
  match_threshold float DEFAULT 0.15
) RETURNS TABLE (
  id text,
  name_primary text,
  name_alt text[],
  name_en text,
  state text,
  similarity float
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    vfc.id,
    vfc.name_primary,
    vfc.name_alt,
    vfc.name_en,
    vfc.state,
    extensions.similarity(vfc.search_text, query_text)::float AS similarity
  FROM public.vietnamese_food_composition vfc
  WHERE extensions.similarity(vfc.search_text, query_text) >= match_threshold
  ORDER BY extensions.similarity(vfc.search_text, query_text) DESC
  LIMIT match_count;
END;
$$ LANGUAGE plpgsql STABLE;
