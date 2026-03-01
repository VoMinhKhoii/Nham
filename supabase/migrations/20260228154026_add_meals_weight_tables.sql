CREATE TABLE "body_weight_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"logged_date" date NOT NULL,
	"weight_kg" numeric(5, 2) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "body_weight_log_user_date_uniq" UNIQUE("user_id","logged_date")
);
--> statement-breakpoint
CREATE TABLE "meal_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"meal_id" uuid NOT NULL,
	"food_composition_id" text,
	"ingredient_name" text NOT NULL,
	"estimated_grams" real,
	"user_facing_unit" text,
	"cooking_method" text,
	"match_confidence" real,
	"calories_kcal" jsonb,
	"protein_g" jsonb,
	"carbohydrate_g" jsonb,
	"fat_g" jsonb,
	"fiber_g" jsonb,
	"sodium_mg" jsonb,
	"calcium_mg" jsonb,
	"iron_mg" jsonb,
	"magnesium_mg" jsonb,
	"phosphorus_mg" jsonb,
	"potassium_mg" jsonb,
	"zinc_mg" jsonb,
	"copper_mcg" jsonb,
	"manganese_mg" jsonb,
	"beta_carotene_mcg" jsonb,
	"vitamin_a_mcg" jsonb,
	"vitamin_d_mcg" jsonb,
	"vitamin_e_mg" jsonb,
	"vitamin_k_mcg" jsonb,
	"vitamin_c_mg" jsonb,
	"vitamin_b1_mg" jsonb,
	"vitamin_b2_mg" jsonb,
	"vitamin_pp_mg" jsonb,
	"vitamin_b5_mg" jsonb,
	"vitamin_b6_mg" jsonb,
	"vitamin_b9_mcg" jsonb,
	"vitamin_b12_mcg" jsonb,
	"vitamin_h_mcg" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "meals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"raw_input" text NOT NULL,
	"meal_slot" text,
	"slot_override" boolean DEFAULT false,
	"confidence_overall" text,
	"logged_at" timestamp with time zone DEFAULT now() NOT NULL,
	"calories_kcal" jsonb,
	"protein_g" jsonb,
	"carbohydrate_g" jsonb,
	"fat_g" jsonb,
	"fiber_g" jsonb,
	"sodium_mg" jsonb,
	"calcium_mg" jsonb,
	"iron_mg" jsonb,
	"magnesium_mg" jsonb,
	"phosphorus_mg" jsonb,
	"potassium_mg" jsonb,
	"zinc_mg" jsonb,
	"copper_mcg" jsonb,
	"manganese_mg" jsonb,
	"beta_carotene_mcg" jsonb,
	"vitamin_a_mcg" jsonb,
	"vitamin_d_mcg" jsonb,
	"vitamin_e_mg" jsonb,
	"vitamin_k_mcg" jsonb,
	"vitamin_c_mg" jsonb,
	"vitamin_b1_mg" jsonb,
	"vitamin_b2_mg" jsonb,
	"vitamin_pp_mg" jsonb,
	"vitamin_b5_mg" jsonb,
	"vitamin_b6_mg" jsonb,
	"vitamin_b9_mcg" jsonb,
	"vitamin_b12_mcg" jsonb,
	"vitamin_h_mcg" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "meals_meal_slot_check" CHECK ("meals"."meal_slot" IN ('breakfast', 'brunch', 'lunch', 'dinner', 'snack')),
	CONSTRAINT "meals_confidence_overall_check" CHECK ("meals"."confidence_overall" IN ('high', 'medium', 'low'))
);
--> statement-breakpoint
CREATE TABLE "unmatched_ingredients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"meal_id" uuid,
	"query_text" text NOT NULL,
	"meal_context" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "body_weight_log" ADD CONSTRAINT "body_weight_log_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meal_items" ADD CONSTRAINT "meal_items_meal_id_meals_id_fk" FOREIGN KEY ("meal_id") REFERENCES "public"."meals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meal_items" ADD CONSTRAINT "meal_items_food_composition_id_vietnamese_food_composition_id_fk" FOREIGN KEY ("food_composition_id") REFERENCES "public"."vietnamese_food_composition"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meals" ADD CONSTRAINT "meals_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "unmatched_ingredients" ADD CONSTRAINT "unmatched_ingredients_meal_id_meals_id_fk" FOREIGN KEY ("meal_id") REFERENCES "public"."meals"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "meals_user_logged_at_idx" ON "meals" USING btree ("user_id","logged_at");