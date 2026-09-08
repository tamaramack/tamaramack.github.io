# Tamara Gisele Mack — Nuxt profile

Parallel SSR professional profile for [tamaramack.github.io](https://tamaramack.github.io/).

Tamara Gisele Mack — Founder of HyperActivity, Creative Technologist.

Stack: **Nuxt 4**, **Nitro**, **TypeScript**, **Pug**, **SCSS**.

The original Vue CLI app at the repository root was removed in Aug 2026. This directory is the **required** site source and GitHub Pages publish target for the domain root.

**Root route:** `app/pages/index.vue` → `https://tamaramack.github.io/`

## Public routes

| Path | Page |
| --- | --- |
| `/` | Profile home (Nuxt app root — do not replace) |
| `/practice` | Capabilities |
| `/hyperactivity` | Firm |
| `/portfolio` | Portfolio links hub |
| `/architecture` | Nuxt stack and deploy overview |
| `/about` | Biography |
| `/about/resume` | Experience |

Full technical documentation: [docs/architecture.md](../../docs/architecture.md) (also linked from `/architecture` and `/portfolio`).

## Related links

| Label | URL |
| --- | --- |
| Live site | [tamaramack.github.io](https://tamaramack.github.io/) |
| Portfolio page | [tamaramack.github.io/portfolio](https://tamaramack.github.io/portfolio) |
| Source (this app) | [apps/profile on GitHub](https://github.com/tamaramack/tamaramack.github.io/tree/development/apps/profile) |
| Repository | [tamaramack/tamaramack.github.io](https://github.com/tamaramack/tamaramack.github.io) |
| Nx portfolio | [likwidmack/portfolio](https://github.com/likwidmack/portfolio) |
| Portfolio app path | [apps/portfolio](../../apps/portfolio) (reserved for portfolio repo) |

## Apps in this monorepo

| App | Path | Role |
| --- | --- | --- |
| Profile site | `apps/profile/` | Publishes tamaramack.github.io |
| Portfolio repo | `apps/portfolio/` | Reserved for likwidmack/portfolio |
| Creative work | [likwidmack.com](https://likwidmack.com) |

## Scripts

```bash
pnpm install
pnpm dev             # Nitro SSR dev server
pnpm build           # Node SSR bundle in .output/server
pnpm build:pages     # github_pages preset → .output/public at site root
pnpm typecheck
```

## GitHub Pages

User site URL: `https://tamaramack.github.io/` (root, not `/repo/`).

CI on `development` builds the static site but does not publish it. Successful pushes trigger an auto-squash PR to `main`; merging `main` deploys GitHub Pages. You can also deploy manually from **Actions → Deploy to GitHub Pages → Run workflow**.

Set **Settings → Pages → Source** to **GitHub Actions** if it is still on the legacy `main` branch.
