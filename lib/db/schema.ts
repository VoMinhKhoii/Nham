import { sql } from 'drizzle-orm';
import {
  boolean,
  check,
  decimal,
  pgSchema,
  pgTable,
  smallint,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

// Reference to Supabase auth schema
const authSchema = pgSchema('auth');
const authUsers = authSchema.table('users', {
  id: uuid('id').primaryKey(),
});

export const userProfiles = pgTable(
  'user_profiles',
  {
    userId: uuid('user_id')
      .primaryKey()
      .references(() => authUsers.id, { onDelete: 'cascade' }),

    // Screen 1: Body Metrics
    weightKg: decimal('weight_kg', { precision: 5, scale: 2 }),
    heightCm: smallint('height_cm'),
    age: smallint('age'),
    biologicalSex: text('biological_sex'),
    activityLevel: text('activity_level'),
    tdeeKcal: smallint('tdee_kcal'),

    // Screen 2: Goal & Targets
    goal: text('goal'),
    aggression: text('aggression'),
    calorieTarget: smallint('calorie_target'),
    proteinTargetG: smallint('protein_target_g'),
    carbsTargetG: smallint('carbs_target_g'),
    fatTargetG: smallint('fat_target_g'),

    // Screen 3: Regional Profile
    regionalProfile: text('regional_profile'),

    // Screen 4: Cooking Habits
    oilUsage: text('oil_usage'),
    fatTrimPork: text('fat_trim_pork'),
    fatTrimChicken: text('fat_trim_chicken'),
    fatTrimFish: text('fat_trim_fish'),
    boneAwareness: boolean('bone_awareness').default(false),
    defaultRicePortion: text('default_rice_portion'),
    sugarBraised: text('sugar_braised'),

    // Screen 5: Portion Calibration
    bowlSizeMl: smallint('bowl_size_ml').default(200),
    plateSizeMl: smallint('plate_size_ml').default(400),

    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    // Domain A: Application data shape constraints — Drizzle is source of truth
    check(
      'user_profiles_biological_sex_check',
      sql`${table.biologicalSex} IN ('male', 'female')`
    ),
    check(
      'user_profiles_activity_level_check',
      sql`${table.activityLevel} IN ('sedentary', 'light', 'moderate', 'very_active')`
    ),
    check(
      'user_profiles_goal_check',
      sql`${table.goal} IN ('cutting', 'bulking', 'maintaining')`
    ),
    check(
      'user_profiles_aggression_check',
      sql`${table.aggression} IN ('gentle', 'moderate', 'aggressive')`
    ),
    check(
      'user_profiles_regional_profile_check',
      sql`${table.regionalProfile} IN ('mien_bac', 'mien_trung', 'mien_nam', 'mien_tay')`
    ),
    check(
      'user_profiles_oil_usage_check',
      sql`${table.oilUsage} IN ('minimal', 'normal', 'heavy')`
    ),
    check(
      'user_profiles_fat_trim_pork_check',
      sql`${table.fatTrimPork} IN ('trim', 'eat_all', 'by_dish')`
    ),
    check(
      'user_profiles_fat_trim_chicken_check',
      sql`${table.fatTrimChicken} IN ('trim', 'eat_all', 'by_dish')`
    ),
    check(
      'user_profiles_fat_trim_fish_check',
      sql`${table.fatTrimFish} IN ('trim', 'eat_all', 'by_dish')`
    ),
    check(
      'user_profiles_default_rice_portion_check',
      sql`${table.defaultRicePortion} IN ('small', 'medium', 'large')`
    ),
    check(
      'user_profiles_sugar_braised_check',
      sql`${table.sugarBraised} IN ('low', 'medium', 'high')`
    ),
  ]
);
