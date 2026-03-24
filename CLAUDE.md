# Project Guidelines

## Tech Stack
- React 19 + TypeScript + Vite
- Tailwind CSS v4 (via @tailwindcss/vite plugin)
- TanStack Query v5 (React Query)
- Zod for API response validation
- react-error-boundary for error handling

## Code Quality
- Focus is always on code quality — production-grade, not throwaway
- Create reusable components — extract shared patterns, avoid duplication
- Use Zod schemas at API boundaries to validate all backend responses
- 3-layer error handling: Zod validation → TanStack Query error states → ErrorBoundary
- ALWAYS use `/tanstack-query` skill when implementing, editing, or reviewing any API calls, data fetching, or React Query hooks

## Commands
- `nvm use 22` — always use Node 22
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — run ESLint

## Pre-Commit Review Flow
ALWAYS run these three review passes before committing any code:
1. `/code-review-and-quality` — 5-axis review (correctness, readability, architecture, security, performance)
2. `/vercel-react-best-practices` — React performance rules (async waterfalls, bundle size, re-renders, rendering, JS patterns)
3. `/vercel-composition-patterns` — Component architecture (no boolean props, compound components, explicit variants, composition over config)

Categorize findings as Critical, Important, or Suggestion. If any Critical or Important findings exist, present them and WAIT for user decision before committing.

## Git Commits
- Do NOT include "Co-Authored-By: Claude" lines in commit messages

## Structure
- `src/schemas/` — Zod schemas + inferred TypeScript types
- `src/api/` — fetch client + endpoint functions
- `src/hooks/` — React Query hooks + utility hooks
- `src/components/` — React components
- `src/utils/` — formatting helpers
