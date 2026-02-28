-- =============================================================================
-- Domain B: pgvector Embedding Infrastructure
-- Source of Truth: Raw SQL (DO NOT generate with drizzle-kit)
--
-- This migration is managed manually. It contains Supabase-specific features
-- (pgvector extension, embedding functions, HNSW index) that have no equivalent
-- in Drizzle's TypeScript schema and must never be overwritten by drizzle-kit
-- generate.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Enable pgvector extension
-- -----------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;

-- -----------------------------------------------------------------------------
-- 2. Add embedding column to vietnamese_food_composition
--    384 dimensions matches Supabase's built-in gte-small model
-- -----------------------------------------------------------------------------
ALTER TABLE public.vietnamese_food_composition
  ADD COLUMN IF NOT EXISTS embedding vector(384);

-- -----------------------------------------------------------------------------
-- 3. Helper function: build combined text for embedding generation
--    Concatenates name_primary + name_alt (space-joined) + name_en
--    Marked IMMUTABLE since output depends only on inputs
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.build_food_embedding_text(
  p_name_primary text,
  p_name_alt text[],
  p_name_en text
) RETURNS text AS $$
BEGIN
  RETURN p_name_primary
    || COALESCE(' ' || array_to_string(p_name_alt, ' '), '')
    || ' ' || p_name_en;
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
  query_embedding vector(384),
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
-- 6. Generate embeddings for all existing rows
--    Uses Supabase's built-in AI embedding function (ai schema).
--
--    NOTE: This requires the ai schema to be available on the Supabase project.
--    Test with: SELECT ai.embed('gte-small', 'test')::vector(384);
--
--    If ai.embed is not available, embeddings must be generated via one of:
--    a) Edge Function calling an embedding API (OpenAI, Supabase hosted model)
--    b) A script using supabase-js that generates embeddings externally
--       and updates the rows in batch
--    In that case, comment out the UPDATE below and run the alternative approach
--    after this migration is applied.
-- -----------------------------------------------------------------------------
UPDATE public.vietnamese_food_composition
SET embedding = ai.embed(
  'gte-small',
  public.build_food_embedding_text(name_primary, name_alt, name_en)
)::vector(384)
WHERE embedding IS NULL;
