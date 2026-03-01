-- Ensure extensions schema is on search_path for vector type
SET search_path TO public, extensions;

-- pgvector extension must exist before using vector type
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;

ALTER TABLE "vietnamese_food_composition" ADD COLUMN "search_text" text;--> statement-breakpoint
ALTER TABLE "vietnamese_food_composition" ADD COLUMN "embedding" vector(768);