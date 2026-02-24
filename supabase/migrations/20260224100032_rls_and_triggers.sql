-- =============================================================================
-- Domain B: Database Security & Logic
-- Source of Truth: Raw SQL (DO NOT generate with drizzle-kit)
--
-- This migration is managed manually. It contains Supabase-specific features
-- (RLS policies, triggers, functions) that have no equivalent in Drizzle's
-- TypeScript schema and must never be overwritten by drizzle-kit generate.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Trigger: auto-create profile row when a new Supabase user signs up
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- -----------------------------------------------------------------------------
-- RLS: Row Level Security
-- -----------------------------------------------------------------------------
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = user_id);
