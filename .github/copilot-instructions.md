# Copilot Instructions

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

## Architecture

### Project Structure
- `/app` - Next.js App Router pages and layouts
- `/components/ui` - shadcn/ui components (managed by CLI, avoid manual edits)
- `/components/landing-page` - Custom landing page components
- `/lib` - Shared utilities (includes `cn()` helper)
- `/hooks` - Custom React hooks
- `/public` - Static assets

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

### Package Manager
Project uses Bun for package management and running scripts.
