-- =============================================================================
-- Domain B: pg_trgm Fuzzy Ingredient Search (Primary Retrieval)
-- Source of Truth: Raw SQL (DO NOT generate with drizzle-kit)
--
-- Strategy: pg_trgm trigram matching is the PRIMARY ingredient lookup.
-- pgvector semantic search (01-02 migration) is the FALLBACK for true
-- synonyms that trigram can't catch.
--
-- Diacritic routing: Vietnamese diacritics are semantically load-bearing
-- (bò=beef, bơ=butter, bổ=nutritious). The search function detects
-- whether the query contains diacritics and routes to the appropriate
-- column — never mixes them.
-- =============================================================================

SET search_path TO public, extensions;

-- -----------------------------------------------------------------------------
-- 1. Enable extensions
-- -----------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA extensions;

-- -----------------------------------------------------------------------------
-- 2. Columns exist via Drizzle schema:
--    - search_text       (20260228155000_add_search_columns)
--    - search_text_ascii (20260228155500_add_search_text_ascii)
-- -----------------------------------------------------------------------------

-- Populate search_text for existing rows
UPDATE public.vietnamese_food_composition
SET search_text = name_primary
  || COALESCE(' ' || array_to_string(name_alt, ' '), '')
  || ' ' || name_en
WHERE search_text IS NULL;

-- Populate search_text_ascii (lowered, unaccented)
UPDATE public.vietnamese_food_composition
SET search_text_ascii = lower(extensions.unaccent(
  name_primary
  || COALESCE(' ' || array_to_string(name_alt, ' '), '')
  || ' ' || name_en
))
WHERE search_text_ascii IS NULL;

-- Trigger to auto-populate both search columns on insert/update
CREATE OR REPLACE FUNCTION public.build_food_search_text()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_text := NEW.name_primary
    || COALESCE(' ' || array_to_string(NEW.name_alt, ' '), '')
    || ' ' || NEW.name_en;
  NEW.search_text_ascii := lower(extensions.unaccent(NEW.search_text));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_food_composition_search_text
  BEFORE INSERT OR UPDATE OF name_primary, name_alt, name_en
  ON public.vietnamese_food_composition
  FOR EACH ROW
  EXECUTE FUNCTION public.build_food_search_text();

-- -----------------------------------------------------------------------------
-- 3. GIN trigram indexes on both search columns
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_food_composition_trgm
  ON public.vietnamese_food_composition
  USING gin (search_text gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_food_composition_trgm_ascii
  ON public.vietnamese_food_composition
  USING gin (search_text_ascii gin_trgm_ops);

-- -----------------------------------------------------------------------------
-- 4. Primary search function: fuzzy_match_ingredients
--    Detects whether query contains Vietnamese diacritics and routes:
--      - With diacritics → search search_text (full precision)
--      - Without diacritics → search search_text_ascii (stripped)
--    This prevents collisions like bò/bơ/bổ when diacritics are present.
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
DECLARE
  has_diacritics boolean;
  normalized_query text;
BEGIN
  -- Detect: if unaccent(query) differs from query, input has diacritics
  normalized_query := lower(extensions.unaccent(query_text));
  has_diacritics := (normalized_query IS DISTINCT FROM lower(query_text));

  IF has_diacritics THEN
    -- Vietnamese input with diacritics → search original column
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
  ELSE
    -- ASCII input (no diacritics) → search stripped column
    RETURN QUERY
    SELECT
      vfc.id,
      vfc.name_primary,
      vfc.name_alt,
      vfc.name_en,
      vfc.state,
      extensions.similarity(vfc.search_text_ascii, normalized_query)::float AS similarity
    FROM public.vietnamese_food_composition vfc
    WHERE extensions.similarity(vfc.search_text_ascii, normalized_query) >= match_threshold
    ORDER BY extensions.similarity(vfc.search_text_ascii, normalized_query) DESC
    LIMIT match_count;
  END IF;
END;
$$ LANGUAGE plpgsql STABLE;
