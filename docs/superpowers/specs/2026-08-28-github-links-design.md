# GitHub links and branch hygiene — design spec

Date: 2026-08-28  
Site: `apps/portfolio` on https://tamaramack.github.io/

## Intent

Surface the right GitHub and portfolio destinations without reviving in-repo Studio/study pages. README and docs use the live site URL; the published site links to source folder and a `/portfolio` hub page.

## Link placement

| Destination | URL | README / docs | Live site |
| --- | --- | --- | --- |
| Live profile site (A) | https://tamaramack.github.io/ | Yes | implicit (you are here) |
| Source folder (B) | …/tree/development/apps/portfolio | — | footer, about, `/portfolio` |
| Portfolio hub (C) | https://tamaramack.github.io/portfolio | docs index | nav, footer, home, about |
| This repository | https://github.com/tamaramack/tamaramack.github.io | Yes | footer, about, `/portfolio` |
| Nx portfolio repo | https://github.com/likwidmack/portfolio | Yes | footer, about, `/portfolio` |
| Creative work | https://likwidmack.com | Yes | header, footer, `/portfolio` |
| LinkedIn | https://www.linkedin.com/in/likwidmack | — | header, footer |

## `/portfolio` page

A single hub page at `/portfolio` with four cards:

1. likwidmack.com — creative work
2. likwidmack/portfolio — Nx full-stack portfolio repo
3. apps/portfolio on GitHub — Nuxt source for this site
4. tamaramack.github.io repo — monorepo root

No embedded studies or iframes. Experiments stay on likwidmack.com.

## Data model

Extend `shared/profile.ts`:

```ts
repository: string
portfolioSource: string  // B
portfolioRepo: string    // likwidmack/portfolio
```

`site` remains the canonical live URL (A).

## Branch hygiene

| Branch | Action |
| --- | --- |
| `development` | Keep as default; CI only — promotes to `main` via auto-squash PR |
| `main` | Production; auto-deploys GitHub Pages on push |
| `master` | Unprotect and delete (manual, admin) |
| `gh-pages` | Review for removal after Actions deploy confirmed |
| Stale feature branches | Delete remotes |

Protection rules require repo admin; automation token returns 403.

## Topics and metadata

GitHub repository topics (updated Aug 2026):

`nuxt`, `nitro`, `typescript`, `portfolio`, `creative-technologist`, `hyperactivity`, `github-pages`, `pug`, `scss`, `ssr`, `vue`, `tamara-mack`

Site meta tags in `nuxt.config.ts`: description, keywords, author, Open Graph, Twitter card.

Package keywords in root `package.json`, `apps/portfolio/package.json`, and legacy `app.json`.

## Navigation

Add **Portfolio** to primary nav between HyperActivity and About. Header keeps likwidmack.com and LinkedIn only; GitHub links live in footer, about sidebar, and `/portfolio`.
