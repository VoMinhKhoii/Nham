# Database Architecture

## Stack

- **Database**: Supabase (PostgreSQL)
- **ORM**: Drizzle ORM (`drizzle-orm/postgres-js`)
- **Migration tool**: `drizzle-kit generate` → Supabase CLI applies

## Bounded Source of Truth

This project enforces a two-domain model. Do not mix responsibilities.

### Domain A — Application Data Shape (Drizzle owns this)

`lib/db/schema.ts` is the single source of truth for:
- Tables, columns, types, defaults
- Foreign keys, indexes
- CHECK constraints (via Drizzle's `check()` API)

**Workflow when schema changes:**
1. Edit `lib/db/schema.ts`
2. Run `bunx drizzle-kit generate` → outputs a new timestamped SQL file to `supabase/migrations/`
3. Rename the generated file to match a real Supabase timestamp if needed (see Naming Convention below)
4. Apply via `supabase db push`

Never hand-write DDL for tables/columns. Never add CHECK constraints directly in SQL files.

### Domain B — Security & Database Logic (Raw SQL owns this)

Supabase-specific features are maintained as hand-authored SQL migration files:
- RLS `ENABLE` / `CREATE POLICY`
- Postgres functions and triggers (e.g., `handle_new_user`)

These files are never generated or touched by `drizzle-kit`. Create them with `supabase migration new <name>`.

## File Locations

| Path | Purpose |
|------|---------|
| `lib/db/schema.ts` | Drizzle schema — Domain A source of truth |
| `lib/db/index.ts` | Drizzle client (`db` export) |
| `drizzle.config.ts` | Drizzle config — `out` points to `supabase/migrations/` |
| `supabase/migrations/` | All migration SQL files (Drizzle-generated + manual) |
| `supabase/migrations/meta/` | Drizzle internal state — do not edit manually |

## Migration Naming Convention

Supabase uses timestamp-based filenames: `YYYYMMDDHHMMSS_description.sql`

- Drizzle-generated files are renamed after generation to match this format
- The `meta/_journal.json` tag and `meta/<timestamp>_snapshot.json` filename must be kept in sync with the renamed SQL file

## Current Migrations

| File | Domain | Description |
|------|--------|-------------|
| `20260224095657_setup_user_profiles.sql` | A (Drizzle) | `user_profiles` table with all columns and CHECK constraints |
| `20260224100032_rls_and_triggers.sql` | B (Manual) | RLS policies + `handle_new_user` trigger |

## DB Client Usage

```ts
import { db } from '@/lib/db';
import { userProfiles } from '@/lib/db/schema';

const profile = await db.query.userProfiles.findFirst({
  where: (t, { eq }) => eq(t.userId, userId),
});
```

The `db` instance uses `postgres-js` under the hood with `DATABASE_URL` from env.
