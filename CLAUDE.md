# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Build for production
npm run generate   # Static site generation
npm run preview    # Preview production build
```

No lint or test scripts are configured yet.

## Stack

- **Nuxt 4** with the `app/` directory convention (source files live under `app/`, not project root)
- **Tailwind CSS 4** — configured via the `@tailwindcss/vite` plugin in `nuxt.config.ts`; styles imported via `app/assets/css/main.css`
- **Pinia** (`@pinia/nuxt`) for state management
- **@nuxt/content** for file-based content (Markdown/JSON/etc. under `content/`)
- **@nuxt/image** for optimized image handling
- **better-sqlite3** for server-side SQLite database access (used in Nuxt server routes/API)

## Architecture notes

- Nuxt 4's `app/` directory is the source root: pages, components, composables, layouts, and stores go under `app/`, not at the project root.
- Server-side logic (API routes, database access with better-sqlite3) belongs in `app/server/`.
- `content/` at the project root is where `@nuxt/content` reads Markdown/data files.
