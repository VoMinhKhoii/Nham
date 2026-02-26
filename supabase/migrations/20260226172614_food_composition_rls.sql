-- =============================================================================
-- Domain B: Database Security & Logic
-- Source of Truth: Raw SQL (DO NOT generate with drizzle-kit)
--
-- This migration is managed manually. It contains Supabase-specific features
-- (RLS policies) that have no equivalent in Drizzle's TypeScript schema.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- RLS: Row Level Security for vietnamese_food_composition
-- This is public reference data — read-only for all authenticated users.
-- -----------------------------------------------------------------------------
ALTER TABLE public.vietnamese_food_composition ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read food composition data"
  ON public.vietnamese_food_composition FOR SELECT
  USING (true);
