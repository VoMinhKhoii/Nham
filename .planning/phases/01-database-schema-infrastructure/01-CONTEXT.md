# Phase 1: Database Schema & Infrastructure - Context

**Gathered:** 2026-02-28
**Status:** Ready for planning

<domain>
## Phase Boundary

All data structures and search infrastructure for the app's features: pgvector embeddings on the existing `vietnamese_food_composition` table, new `meals` and `meal_items` tables, `body_weight_log` table, `unmatched_ingredients` table, and RLS policies. Builds on existing `user_profiles` and `vietnamese_food_composition` tables.

</domain>

<decisions>
## Implementation Decisions

### Bounded nutrition scope
- Every nutrient from the food composition table gets its own column on `meals` (and `meal_items`), each storing a JSONB object `{low, mid, high}`
- Column names mirror the food composition table: `calories_kcal`, `protein_g`, `carbohydrate_g`, `fat_g`, `fiber_g`, `sodium_mg`, `calcium_mg`, etc.
- v1 AI pipeline only populates the big 4: calories, protein, carbs, fat — all others remain null until future versions
- Goal-adjusted display logic:
  - **Cutting**: show high for calories/fat/carbs, low for protein (pessimistic → discourages overeating)
  - **Bulking**: show low for calories/fat/carbs, low for protein (pessimistic → encourages eating more)
  - **Maintaining**: show mid for everything
- Aggression level (from onboarding) controls how wide the bound margins are
- Daily totals use the goal-adjusted value; meal detail shows a range/slider for the full estimate

### Meal record structure
- `meals` table stores: raw text input, meal slot, timestamps, denormalized nutrition totals (JSONB bounds per nutrient), overall confidence signal
- Meal slot (Sáng/Trưa/Tối/Bữa phụ) is AI-classified based on time + meal content, user can override
- Schema includes: `logged_at timestamp`, `meal_slot text` (nullable), `slot_override boolean`
- No additional metadata (notes, photos, location) in v1

### Meal item structure
- `meal_items` stores per-ingredient breakdown linked to parent meal and food composition table
- Each item carries: estimated quantity in grams, user-facing unit (e.g., "1 chén", "2 miếng"), cooking method tag (e.g., "chiên", "luộc"), match confidence score
- Per-item nutrition bounds in same JSONB `{low, mid, high}` format as meals

### Weight entry design
- Just weight + date — minimal friction for consistent logging
- Precision: 0.01 kg (numeric(5,2)) to match digital scales
- One entry per day — latest entry overwrites previous for same date
- Backfill allowed for any past date

### Ingredient matching & embeddings
- Combined text embeddings: concatenate `name_primary` + `name_alt` + `name_en` into one embedding per food composition row
- Use Supabase-hosted embedding model via pgvector (no external API calls)
- Semantic search returns top-3 candidates; AI pipeline (LLM) picks best match based on meal context
- User sees only the final selected match with confidence score
- `unmatched_ingredients` table logs ingredients with no DB match: query text, meal context, timestamp — for future DB expansion

### Claude's Discretion
- Exact JSONB column naming and structure details
- Index strategy for embeddings (HNSW vs IVFFlat)
- RLS policy implementation patterns
- Trigger/function design for denormalized totals
- `unmatched_ingredients` table schema details beyond query text + context + timestamp

</decisions>

<specifics>
## Specific Ideas

- Goal-adjusted display serves as an "underlying motivation engine" — the default daily intake number nudges users toward their goal without being preachy
- The estimate range should be visible but not noisy — think of a subtle slider showing where the selected value falls within the low/high range
- Meal items should be rich enough for full transparency: user can see exactly what the AI assumed about each ingredient (quantity, cooking method, which DB entry it matched to)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-database-schema-infrastructure*
*Context gathered: 2026-02-28*
