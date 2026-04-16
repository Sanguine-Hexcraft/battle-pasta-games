# Project Structure

Battle Pasta Games is an indie studio website built with **Nuxt 4**, **Tailwind CSS 4**, and **@nuxt/content** for file-based content. All application code lives under `app/`, all content (Markdown) lives under `content/`.

---

## Root-Level Files

| File | What it does |
|------|-------------|
| `nuxt.config.ts` | Nuxt framework config. Sets the base URL (`/battle-pasta-games/`), registers modules (content, image, pinia), and wires up the Tailwind Vite plugin. |
| `content.config.ts` | Defines the two content collections (`games`, `devlog`) and their frontmatter schemas using Zod. Acts as a contract between your Markdown files and the app. |
| `package.json` | NPM dependencies and dev/build scripts. |
| `tsconfig.json` | TypeScript config — mostly just references the Nuxt-generated types. |

---

## `app/` — Application Source

This is where all Vue/Nuxt code lives.

### `app/app.vue`
The root of every page. Contains the sticky top navigation bar (logo, nav links, YouTube live indicator) and `<NuxtPage />` which renders the current route's page component.

### `app/pages/`

| File | Route | What it does |
|------|-------|-------------|
| `index.vue` | `/` | Homepage. Hero section with studio tagline, a featured game card, and latest devlog post. |
| `games/index.vue` | `/games` | Grid listing of all games pulled from `content/games/`. Shows cover, title, status badge, genre, and a link to each game. |
| `games/[slug].vue` | `/games/:slug` | Individual game page. Renders cover, trailer (YouTube embed), about text, screenshots, changelog, and a sidebar of related devlog posts. |
| `devlog/index.vue` | `/devlog` | Sorted list of all devlog posts (newest first). Shows date, game tag, topic tags, title, excerpt, and "Read More". |
| `devlog/[slug].vue` | `/devlog/:slug` | Individual devlog post. Full Markdown prose, prev/next navigation between posts. |
| `about.vue` | `/about` | Stub page ("Coming soon"). |
| `community.vue` | `/community` | Stub page ("Coming soon"). |

### `app/assets/css/main.css`
Global stylesheet. Imports Tailwind, then defines all the custom design tokens (CSS variables) and utility classes that give the site its look:

- **Colors**: `--color-void` (near-black background), `--color-surface`, `--color-gold`, `--color-neon` (pink), `--color-neon-cyan`, `--color-blood`
- **Typography**: Press Start 2P for headings (retro pixel), Inter for body text
- **Utilities**: `.border-chunky`, `.text-glow-gold`, `.text-glow-neon`, `.scanlines` (CRT overlay), `.pixel` (crisp pixel-art rendering)

### Empty directories (reserved for future use)

| Directory | Intended purpose |
|-----------|-----------------|
| `app/components/layout/` | Reusable layout components (header, footer, etc.) |
| `app/components/ui/` | Reusable UI components (buttons, cards, badges, etc.) |
| `app/composables/` | Vue composables (shared reactive logic) |
| `app/layouts/` | Nuxt layout templates (alternative page shells) |
| `app/stores/` | Pinia state stores (e.g. user state, cart, etc.) |

---

## `content/` — Markdown Content

This is where you add games and posts. No code changes needed — just add a Markdown file and it appears on the site.

### `content/games/*.md`

Each file is one game. The filename becomes the URL slug (e.g. `placeholder-game.md` → `/games/placeholder-game`).

**Required frontmatter:**
```yaml
title: "Game Title"
status: in-dev | early-access | released
genre: "Roguelike"
```

**Optional frontmatter:**
```yaml
cover: /images/game-cover.jpg
trailer: https://youtube.com/watch?v=...
platforms:
  steam: https://...
  itch: https://...
release_window: "Q3 2026"
screenshots:
  - /images/screen1.jpg
changelog:
  - version: "0.2.0"
    date: "2026-04-01"
    notes: ["Added feature X", "Fixed bug Y"]
```

### `content/devlog/*.md`

Each file is one devlog post. Filename becomes the URL slug. Name them with a numeric prefix (e.g. `002-title.md`) to control sort order.

**Required frontmatter:**
```yaml
title: "Post Title"
date: "2026-04-15"
```

**Optional frontmatter:**
```yaml
game: placeholder-game   # links the post to a game (shows in sidebar on game page)
tags: [gamedev, design]
excerpt: "Short summary shown on the listing page."
```

---

## `public/` — Static Assets

Files here are served as-is at the root URL.

| Path | What it is |
|------|-----------|
| `public/favicon.ico` | Site favicon |
| `public/robots.txt` | SEO robots directive |
| `public/images/` | Drop game cover art, screenshots, and promo images here. Reference them in frontmatter as `/images/filename.jpg`. |

---

## `.data/` (auto-generated, git-ignored)

`@nuxt/content` generates a SQLite database here at runtime for fast content queries. You never touch this directly — delete it and it will be recreated on next `npm run dev`.

---

## How Everything Connects

```
content/games/placeholder-game.md
    │  (frontmatter: title, status, genre, changelog…)
    └──► /games/placeholder-game  (rendered by app/pages/games/[slug].vue)
             │
             └──► sidebar: devlog posts where `game: placeholder-game`
                      │
                      └──► content/devlog/001-first-steps.md
                               └──► /devlog/001-first-steps  (rendered by app/pages/devlog/[slug].vue)
```

**The data flow:**
1. You write Markdown in `content/`
2. `@nuxt/content` indexes it into a local SQLite database at dev/build time
3. Page components (`app/pages/`) query that database using `queryCollection()` and `queryCollectionItemSurround()`
4. Vue renders the data into HTML using the design tokens from `app/assets/css/main.css`

---

## Dev Commands

```bash
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Production build
npm run generate   # Static site generation (outputs to .output/public/)
npm run preview    # Preview the production/static build
```
