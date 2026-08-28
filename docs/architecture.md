# Nuxt portfolio

The site source lives in `apps/portfolio`: **Nuxt 4**, **SSR through Nitro**, TypeScript, Pug templates, and SCSS.

## Stack

| Layer | Technology | Role |
| --- | --- | --- |
| Framework | Nuxt 4 | App router, layouts, pages, composables |
| UI | Vue 3 | Composition API, `<script setup>`, Pug SFC templates |
| Server | Nitro | SSR, API routes, static prerender |
| Language | TypeScript | Shared types in `shared/` |
| Styles | SCSS | Global tokens + scoped page styles |
| Hosting | GitHub Pages | Static output from `github_pages` preset |

GitHub Pages cannot run that Node server. CI builds with Nitro's `github_pages` preset, which pre-renders the same SSR app to static HTML at **domain root** (`https://tamaramack.github.io/`, `baseURL: '/'`).

```
apps/portfolio/
  app/
    pages/             File-based routes (/, /practice, /architecture, …)
    layouts/           default.vue shell (header, main, footer)
    components/        AppHeader, AppFooter, CapabilityCard, RoleEntry
    composables/       useProfile, usePractice, useExperience
    assets/scss/       Design tokens and global styles
  server/api/          Nitro handlers (profile, practice, experience, health)
  shared/              Content modules imported by app + server
  public/              favicon, robots.txt
  nuxt.config.ts       SSR, prerender routes, head meta, SCSS injection
```

## Data flow

One content source, two consumers:

```
shared/profile.ts ──┬── server/api/profile.get.ts ── GET /api/profile
shared/practice.ts ──┼── server/api/practice.get.ts ── GET /api/practice
shared/experience.ts ┴── server/api/experience.get.ts ─ GET /api/experience
                              │
                              ▼
                    composables/use*.ts (useFetch)
                              │
                              ▼
                         app/pages/*.vue
```

This keeps GitHub Pages prerender and local `nuxt dev` SSR aligned — both read the same API routes.

## Runtime modes

### Development (`pnpm dev`)

Nitro runs an SSR server. Pages render on the server, hydrate in the browser, and fetch `/api/*` from local Nitro routes.

### Production build (`pnpm build`)

| Key | URL |
| --- | --- |
| `site` | https://tamaramack.github.io/ |
| `repository` | https://github.com/tamaramack/tamaramack.github.io |
| `portfolioSource` | …/tree/development/apps/portfolio |
| `portfolioRepo` | https://github.com/likwidmack/portfolio |
| `personalSite` | https://likwidmack.com |

Uses Nitro's `github_pages` preset:

- `ssr: true` — same Vue app as dev
- `baseURL: '/'` — user site at domain root (not `/repo/`)
- Prerender crawls routes listed in `nuxt.config.ts` plus internal links
- Output: static HTML + `_payload.json` in `.output/public`

GitHub Actions uploads `.output/public` and deploys on push to `main`.

## CI and branches

| Branch | CI | Deploy |
| --- | --- | --- |
| `development` | typecheck + build | No |
| `main` | typecheck + build | Yes — GitHub Pages |

[deploy-pages.yml](../.github/workflows/deploy-pages.yml) builds `apps/portfolio`. [promote-to-main.yml](../.github/workflows/promote-to-main.yml) opens a squash PR after `development` CI passes.

## Public routes

| Path | Page |
| --- | --- |
| `/` | Profile home |
| `/practice` | Capabilities |
| `/hyperactivity` | Firm |
| `/portfolio` | Related repos and links |
| `/architecture` | This Nuxt stack |
| `/about` | Biography |
| `/about/resume` | Experience |

## Related repositories

- **GitHub Pages source:** **GitHub Actions**, not `main` or `master` as a static branch.
- **Legacy branches:** `master` and `gh-pages` can be removed once this flow is confirmed.
