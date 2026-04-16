# Battle Pasta Games

Indie game studio site. Built with Nuxt 4, Tailwind CSS 4, and `@nuxt/content` for file-based content.

---

## Dev Commands

```bash
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Build for production
npm run generate   # Static site generation
npm run preview    # Preview production build
```

---

## Adding Content

All content lives in the `content/` directory at the project root. No CMS, no dashboard — just Markdown files.

### Adding a Devlog Post

Create a new `.md` file in `content/devlog/`. Name it with a leading number so posts sort predictably:

```
content/devlog/002-enemy-ai.md
```

**Frontmatter fields:**

```yaml
---
title: Building the Enemy AI           # required
date: 2026-04-20                       # required — YYYY-MM-DD
game: placeholder-game                 # optional — slug of a game in content/games/
tags: [ai, gameplay]                   # optional
excerpt: A short teaser shown on the   # optional — shown on the listing page
         devlog listing page.
---

Full post body in Markdown goes here.
```

- If `game` is set, the post appears in that game's devlog sidebar and links back to the game page.
- If `game` is omitted, the post is studio-wide and only appears on `/devlog`.
- Posts are sorted newest-first on the listing page.

---

### Adding a Game

Create a new `.md` file in `content/games/`. The filename becomes the URL slug:

```
content/games/wraith-and-ruin.md  →  /games/wraith-and-ruin
```

**Frontmatter fields:**

```yaml
---
title: Wraith and Ruin                          # required
status: in-dev                                  # required — in-dev | early-access | released
genre: Roguelike                                # required
platforms:
  steam: https://store.steampowered.com/...     # optional
  itch: https://itch.io/...                     # optional
release_window: Q3 2026                         # optional
cover: /images/games/wraith-and-ruin/cover.jpg  # optional — shown as hero background
trailer: https://youtube.com/watch?v=XXXXX      # optional — YouTube URL, auto-embedded
screenshots:                                    # optional
  - /images/games/wraith-and-ruin/screen1.jpg
  - /images/games/wraith-and-ruin/screen2.jpg
changelog:                                      # optional
  - version: "0.3.0"
    date: 2026-04-10
    notes: Added new enemy type. Fixed save corruption bug on floor 3.
  - version: "0.2.0"
    date: 2026-03-01
    notes: Steam demo released.
---

Game description / lore goes here. This is the "About" section on the game page.

## The World

Subheadings work and render in the styled prose block.

## Features

- Feature one
- Feature two
```

**Images** go in `public/images/games/[game-slug]/`. Reference them from the root, e.g. `/images/games/wraith-and-ruin/cover.jpg`.

**Changelog** entries are shown newest-first as written — order them that way in the file.

**Linked devlog posts** appear automatically on the game page — no manual wiring needed. Just set `game: your-game-slug` in the post frontmatter.

---

## Project Structure

```
content/
  devlog/       # Devlog post Markdown files
  games/        # Game page Markdown files
public/
  images/       # Static images (game covers, screenshots, etc.)
app/
  pages/
    index.vue           # Homepage
    games/
      index.vue         # Games listing
      [slug].vue        # Individual game page
    devlog/
      index.vue         # Devlog listing
      [slug].vue        # Individual post
    about.vue
    community.vue
  assets/css/
    main.css            # Design tokens and global styles (Tailwind 4)
  app.vue               # Root layout (nav, header)
content.config.ts       # @nuxt/content collection schemas
nuxt.config.ts
```

---

## Stack

- **Nuxt 4** — `app/` directory convention
- **Tailwind CSS 4** — configured via `@tailwindcss/vite`; tokens defined in `app/assets/css/main.css`
- **@nuxt/content** — file-based content with typed schemas (`content.config.ts`)
- **@nuxt/image** — optimized image handling
- **Pinia** — state management (available, not yet used)
- **better-sqlite3** — server-side SQLite (available for future server routes)
