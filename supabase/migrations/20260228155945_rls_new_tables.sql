-- =============================================================================
-- Domain B: Database Security & Logic
-- Source of Truth: Raw SQL (DO NOT generate with drizzle-kit)
--
-- This migration is managed manually. It contains Supabase-specific features
-- (RLS policies, triggers, functions) that have no equivalent in Drizzle's
-- TypeScript schema and must never be overwritten by drizzle-kit generate.
--
-- Tables covered: meals, meal_items, body_weight_log, unmatched_ingredients
-- Also: reusable updated_at trigger applied to meals and user_profiles
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Trigger Function: auto-set updated_at on row modification (reusable)
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to meals table
CREATE TRIGGER on_meals_updated
  BEFORE UPDATE ON public.meals
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Apply to user_profiles table (has updated_at but no trigger yet)
DROP TRIGGER IF EXISTS on_user_profiles_updated ON public.user_profiles;
CREATE TRIGGER on_user_profiles_updated
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- -----------------------------------------------------------------------------
-- RLS: meals — direct user_id ownership
-- -----------------------------------------------------------------------------
ALTER TABLE public.meals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own meals"
  ON public.meals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own meals"
  ON public.meals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own meals"
  ON public.meals FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own meals"
  ON public.meals FOR DELETE
  USING (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- RLS: meal_items — ownership inherited via parent meal (JOIN through meals)
-- meal_items has NO direct user_id column; access mediated by meals.user_id
-- -----------------------------------------------------------------------------
ALTER TABLE public.meal_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own meal items"
  ON public.meal_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.meals
      WHERE meals.id = meal_items.meal_id
        AND meals.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own meal items"
  ON public.meal_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.meals
      WHERE meals.id = meal_items.meal_id
        AND meals.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own meal items"
  ON public.meal_items FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.meals
      WHERE meals.id = meal_items.meal_id
        AND meals.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own meal items"
  ON public.meal_items FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.meals
      WHERE meals.id = meal_items.meal_id
        AND meals.user_id = auth.uid()
    )
  );

-- -----------------------------------------------------------------------------
-- RLS: body_weight_log — direct user_id ownership
-- -----------------------------------------------------------------------------
ALTER TABLE public.body_weight_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own weight entries"
  ON public.body_weight_log FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own weight entries"
  ON public.body_weight_log FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own weight entries"
  ON public.body_weight_log FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own weight entries"
  ON public.body_weight_log FOR DELETE
  USING (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- RLS: unmatched_ingredients — INSERT-only for authenticated users
-- Only service_role (which bypasses RLS) can SELECT for admin/analytics.
-- No UPDATE or DELETE for regular users.
-- -----------------------------------------------------------------------------
ALTER TABLE public.unmatched_ingredients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can insert unmatched ingredients"
  ON public.unmatched_ingredients FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
