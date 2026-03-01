# Agent Instructions

## Project Overview

This is a Next.js 16 application using the App Router with TypeScript, React 19, and Tailwind CSS. The project uses shadcn/ui components (New York style) with Biome for linting/formatting.

## Commands

### Development
- `bun dev` - Start development server on localhost:3000
- `bun run build` - Build for production
- `bun start` - Start production server

### Code Quality
- `bun lint` - Run ESLint
- `bunx @biomejs/biome check .` - Run Biome linter
- `bunx @biomejs/biome check --write .` - Run Biome and auto-fix issues
- `bunx @biomejs/biome format --write .` - Format code with Biome

### Database
- `bun db:generate` - Generate Drizzle migration from schema changes
- `bun db:migrate` - Apply migrations locally via Drizzle
- `bun db:studio` - Open Drizzle Studio (DB browser)
- `bun dbr:reset` - Reset remote DB + re-run migrations + seed + backfill embeddings (interactive `y` confirm)
- `bun dbr:reset:nobackfill` - Reset remote DB without embedding backfill
- `bun dbr:push` - Push local migrations to remote
- `bun dbr:pull` - Pull remote schema changes
- `bun dbr:diff` - Diff local schema against remote
- `bun dbr:status` - List migration status on remote

### Testing
- `bun test` - Run all tests via Vitest
- `bun test:watch` - Run tests in watch mode
- `bun --env-file=.env.local vitest run lib/db/__tests__/` - Run DB search tests (requires remote DB + DATABASE_URL)

## Architecture

### Project Structure
- `/app` - Next.js App Router pages and layouts
- `/components/ui` - shadcn/ui components (managed by CLI, avoid manual edits)
- `/components/landing-page` - Custom landing page components
- `/lib` - Shared utilities (includes `cn()` helper)
- `/lib/db` - Drizzle ORM schema, client, and utilities
- `/lib/db/__tests__` - SQL-level DB tests (run against remote Supabase)
- `/hooks` - Custom React hooks
- `/public` - Static assets
- `/scripts` - One-off scripts (embedding backfill, data extraction)
- `/supabase/migrations` - All SQL migrations (Drizzle-generated + manual)
- `/supabase/seed.sql` - Seed data (526 food composition records)
- `/docs` - Project documentation (PRD, DATA.md, DATABASE.md)

### Import Aliases
TypeScript path aliases are configured:
- `@/*` → Root directory
- `@/components` → `./components`
- `@/lib` → `./lib`
- `@/hooks` → `./hooks`
- `@/ui` → `./components/ui`

Always use these aliases instead of relative imports.

### Font Setup
Custom Google Fonts are configured in `app/layout.tsx`:
- Geist Sans (`--font-geist-sans`)
- Geist Mono (`--font-geist-mono`)
- Lora (`--font-lora`)
- DM Sans (`--font-dm-sans`)

## Key Conventions

### UI Components (shadcn/ui)
- Components in `/components/ui` are managed by the shadcn CLI
- Use `bunx shadcn@latest add <component>` to add new components
- These components use CVA (class-variance-authority) for variant management
- All components use the `cn()` utility from `@/lib/utils` for className merging

### Styling
- Tailwind CSS 4 with CSS variables for theming
- Use the `cn()` helper to merge Tailwind classes: `cn('base-class', conditionalClass)`
- Biome enforces sorted classes (using `cn()` and `clsx()`)
- Line width: 80 characters
- Indentation: 2 spaces

### Code Formatting (Biome)
- Single quotes for JS/TS, double quotes for JSX
- Semicolons required
- Arrow function parentheses always included
- Trailing commas (ES5 style)
- Organize imports automatically enabled

### TypeScript
- Strict mode enabled
- Path mapping configured for `@/*` imports
- JSX mode: `react-jsx` (no need to import React)

### Component Patterns
- React Server Components by default (App Router)
- Use `'use client'` directive only when needed (state, effects, browser APIs)
- Prefer composition over configuration
- Use TypeScript interfaces for props

### Disabled Linting Rules
The following rules are intentionally disabled in Biome:
- `noNonNullAssertion` - Non-null assertions allowed
- `noExplicitAny` - Explicit `any` types allowed
- `noArrayIndexKey` - Array index as key allowed
- A11y rules: `noLabelWithoutControl`, `useKeyWithClickEvents`, `noStaticElementInteractions`, `useMediaCaption`

## Dependencies

### Key Libraries
- **UI**: shadcn/ui, Radix UI primitives, Lucide icons
- **Forms**: React Hook Form, Zod validation
- **Animations**: Motion (Framer Motion fork)
- **State**: Built-in React hooks
- **Styling**: Tailwind CSS, tailwind-merge, clsx, CVA
- **Date**: date-fns, react-day-picker
- **Charts**: Recharts
- **Database**: Drizzle ORM (`drizzle-orm/postgres-js`), `postgres` (postgres.js driver)
- **Auth**: Supabase SSR (`@supabase/ssr`, `@supabase/supabase-js`)
- **AI/Embeddings**: `@google/genai` (Gemini API)
- **Testing**: Vitest

### Package Manager
Project uses Bun for package management and running scripts.

## Data: VTN FCT 2007 (Vietnamese Food Composition Table)

- **Location**: `data/vtn_fct_2007/extracted_ingredients.json` (525 records)
- **Extraction**: `scripts/vtn_fct/extract_vtn_fct_2007.py`
- **Full docs**: `docs/DATA.md`

### Parsed JSON Schema

Each record follows this shape:

```jsonc
{
  "id": "fao_vn_2007_{food_code}_{state}",
  "name_primary": "string",
  "name_alt": ["string"],
  "name_en": "string",
  "source": "FAO_VN_2007",
  "state": "raw | cooked",
  "inedible_portion_pct": 0.0,
  "per_100g": {
    "calories_kcal": 344.0,
    "protein_g": 8.6,
    "carbohydrate_g": 74.5,
    "fat_g": 1.5,
    "fiber_g": 0.6,
    "sodium_mg": 3.0,
    "calcium_mg": 32.0,
    "iron_mg": 1.2,
    "magnesium_mg": 17.0,
    "phosphorus_mg": 98.0,
    "potassium_mg": 282.0,
    "zinc_mg": 2.2,
    "copper_mcg": 280.0,
    "manganese_mg": 1.1,
    "beta_carotene_mcg": 0.0,
    "vitamin_a_mcg": 0.0,
    "vitamin_d_mcg": 0.0,
    "vitamin_e_mg": null,
    "vitamin_k_mcg": null,
    "vitamin_c_mg": 0.0,
    "vitamin_b1_mg": 0.14,
    "vitamin_b2_mg": 0.06,
    "vitamin_pp_mg": 2.4,
    "vitamin_b5_mg": null,
    "vitamin_b6_mg": null,
    "vitamin_b9_mcg": null,
    "vitamin_b12_mcg": null,
    "vitamin_h_mcg": null
  },
  "last_verified": "2026-02-26"
}
```

**Key conventions**: Unit suffixes (`_g`, `_mg`, `_mcg`, `_kcal`) on all nutrient keys. `null` = no data in source PDF, `0.0` = explicitly zero.

## Database Architecture

Full documentation in `docs/DATABASE.md`. Key points for agents:

### Two-Domain Model (Do Not Mix)
- **Domain A (Drizzle)**: Tables, columns, types, defaults, FKs, indexes, CHECKs → edit `lib/db/schema.ts` → `bun db:generate`
- **Domain B (Manual SQL)**: RLS, policies, functions, triggers, extensions → hand-write in `supabase/migrations/`
- Drizzle migrations MUST be timestamped before manual migrations that reference their columns

### Ingredient Search Pipeline
1. **Primary**: `fuzzy_match_ingredients()` — pg_trgm trigram matching (free, instant)
2. **Fallback**: `match_ingredients()` — pgvector cosine similarity (needs Gemini API for query embedding)
3. Vietnamese diacritics are **semantically load-bearing** — the function auto-routes queries with diacritics to `search_text` and queries without to `search_text_ascii`

### Critical Supabase Quirks
- Migrations using pgvector/pg_trgm need `SET search_path TO public, extensions;` at top
- `bun` does NOT auto-load `.env.local` for scripts — always use `--env-file=.env.local`
- `DATABASE_URL` password may have special chars — use `encodeDbUrl()` from `@/lib/db`

## Lessons Learned (Phase 1)

These are hard-won lessons from Phase 1 development. Follow them to avoid repeating mistakes.

### Schema & Migration Workflow
- **Always edit `lib/db/schema.ts` first** for any column changes, then generate. Never hand-add columns in SQL migrations.
- **Test migrations against the remote DB early**. Local Supabase and remote Supabase behave differently (search_path, extensions schema, available functions).
- **After `bun dbr:push` fails mid-migration**, repair with: `supabase migration repair --status reverted <timestamp> --linked`, then fix and re-push.
- **Drizzle snapshot/journal must stay in sync** when reordering timestamps. If they drift, `drizzle-kit generate` produces broken diffs.

### Vietnamese Text Search
- **Never normalize (unaccent) both the query AND the data columns simultaneously.** Vietnamese diacritics are load-bearing: bò=beef, bơ=butter, bổ=nutritious. Collapsing diacritics on both sides causes semantic collisions.
- **Short Vietnamese words** (tôm, bún, gạo) have inherently low trigram similarity (0.14–0.24) when matched against longer `search_text` strings. Use a threshold of 0.15 (not 0.25+) or short queries will return nothing.
- **pg_trgm can return "wrong" matches** (e.g., "cơm trắng" matches items containing "trắng" that aren't rice). This is expected — the LLM layer judges result quality, the DB layer just retrieves candidates.

### Testing Against Live DB
- **DB tests need `--env-file=.env.local`** since Vitest doesn't auto-load it.
- **Write assertions against realistic data**, not ideal thresholds. Run a query manually first to calibrate expected similarity scores.
- **Test both the happy path AND the routing logic** — diacritic detection, ASCII fallback, threshold filtering.

### Embedding & API Gotchas
- **`text-embedding-004` is deprecated** (since Jan 2026). Use `gemini-embedding-001` (768 dims).
- **Batch operations need explicit rate limiting**. The backfill script uses 35s delays between batches of 50 for the 100 req/min free tier.
- **Parse 429 retry-after headers** from Gemini API responses for accurate backoff timing.

### Agent Workflow Improvements
- **Read docs/DATABASE.md before any DB work.** It contains the two-domain model, migration naming rules, and all known quirks.
- **When a user says "run X", check `package.json` scripts first.** Don't assume a script exists; if it doesn't, suggest adding one.
- **Commit incrementally, not in one big batch.** Each logical change (schema, migration, search function, tests) should be its own commit for easier rollback.
- **When editing test files, run the tests immediately after each edit** to catch issues early rather than batching edits and debugging multiple failures at once.
- **For Supabase interactive commands** (`dbr:reset`), use `bash mode="async"` with `write_bash` to send the `y` confirmation.
