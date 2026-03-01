-- =============================================================================
-- Domain B: pgvector Embedding Infrastructure
-- Source of Truth: Raw SQL (DO NOT generate with drizzle-kit)
--
-- This migration is managed manually. It contains Supabase-specific features
-- (pgvector extension, embedding functions, HNSW index) that have no equivalent
-- in Drizzle's TypeScript schema and must never be overwritten by drizzle-kit
-- generate.
-- =============================================================================

-- Ensure extensions schema is on search_path so the vector type resolves
SET search_path TO public, extensions;

-- -----------------------------------------------------------------------------
-- 1. Enable pgvector extension
-- -----------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;

-- -----------------------------------------------------------------------------
-- 2. Embedding column exists via Drizzle schema (20260228155000_add_search_columns)
--    768 dimensions for gemini-embedding-001 (default recommended size)
--    Embeddings are generated externally via scripts/backfill_embeddings.ts
-- -----------------------------------------------------------------------------

-- -----------------------------------------------------------------------------
-- 3. Helper function: build combined text for embedding generation
--    Concatenates name_primary + name_alt (space-joined) + name_en
--    Marked IMMUTABLE since output depends only on inputs
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.build_food_embedding_text(
  p_name_primary text,
  p_name_alt text[],
  p_name_en text,
  p_type_vn text DEFAULT '',
  p_type_en text DEFAULT ''
) RETURNS text AS $$
BEGIN
  RETURN p_name_primary
    || COALESCE(' ' || array_to_string(p_name_alt, ' '), '')
    || ' ' || p_name_en
    || ' ' || p_type_vn
    || ' ' || p_type_en;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- -----------------------------------------------------------------------------
-- 4. Semantic search function: match_ingredients
--    Returns top-N candidates by cosine similarity from the embedding column.
--    The match_threshold parameter is available for future filtering but the
--    initial implementation returns top-N by distance. The AI pipeline
--    (Phase 3) will use confidence scores to decide match quality.
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.match_ingredients(
  query_embedding vector(768),
  match_count int DEFAULT 3,
  match_threshold float DEFAULT 0.5
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
    1 - (vfc.embedding <=> query_embedding)::float AS similarity
  FROM public.vietnamese_food_composition vfc
  WHERE vfc.embedding IS NOT NULL
    AND 1 - (vfc.embedding <=> query_embedding)::float >= match_threshold
  ORDER BY vfc.embedding <=> query_embedding
  LIMIT match_count;
END;
$$ LANGUAGE plpgsql STABLE;

-- -----------------------------------------------------------------------------
-- 5. HNSW index for fast vector similarity search
--    HNSW chosen over IVFFlat because:
--    - Small dataset (526 rows): HNSW provides better recall at this scale
--    - No periodic re-training needed (unlike IVFFlat which requires REINDEX)
--    - Parameters m=16, ef_construction=64 are appropriate for this table size
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_food_composition_embedding
  ON public.vietnamese_food_composition
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

-- -----------------------------------------------------------------------------
-- 6. Embeddings generated externally via scripts/backfill_embeddings.ts
--    using gemini-embedding-001 model (768 dimensions).
--    This migration only sets up storage + search infrastructure.
-- -----------------------------------------------------------------------------
