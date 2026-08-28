# Parallel Nuxt portfolio

This repository now has two apps:

- **Legacy Vue CLI 3 / Vue 2 app** at the repository root. It stays in place so existing experiments are not rewritten in one pass.
- **Parallel Nuxt 4 portfolio** in `apps/portfolio`. This is the architecture going forward: **SSR through Nitro**, TypeScript, Pug templates, and SCSS.

## Runtime

`nuxt dev` and `nuxt build` produce a Nitro Node server (`ssr: true`). Pages fetch `/api/profile`, `/api/practice`, `/api/experience`, and `/api/health` from Nitro routes.

GitHub Pages cannot run that Node server. CI therefore builds with Nitro's `github_pages` preset, which pre-renders the same SSR app to static HTML at **domain root** (`https://tamaramack.github.io/`, `baseURL: '/'`).

Do not set `NUXT_APP_BASE_URL` to a repository slug. This is a user site, not a project site under `/repo/`.

## Layout

```
apps/portfolio/
  app/                 Vue app (pages, layouts, components, SCSS)
  server/api/          Nitro routes
  shared/              Types and catalog used by app + server
  nuxt.config.ts
```

## Public URLs

| Path | Role |
| --- | --- |
| `/` | Profile home |
| `/practice` | Capabilities |
| `/hyperactivity` | Firm page |
| `/portfolio` | Portfolio links hub (repos + likwidmack.com) |
| `/about` | Biography |
| `/about/resume` | Experience |

Creative experiments live at [likwidmack.com](https://likwidmack.com).

## External links

Link destinations are defined in `shared/profile.ts` and surfaced in the footer, about sidebar, and `/portfolio` page.

| Key | URL | Where documented |
| --- | --- | --- |
| `site` | https://tamaramack.github.io/ | README (live site) |
| `repository` | https://github.com/tamaramack/tamaramack.github.io | Live site |
| `portfolioSource` | …/tree/development/apps/portfolio | Live site (source folder) |
| `portfolioRepo` | https://github.com/likwidmack/portfolio | Live site |
| `personalSite` | https://likwidmack.com | Live site |

## Branches and deployment

| Branch | CI | Deploy |
| --- | --- | --- |
| `development` | Push and PR via [.github/workflows/deploy-pages.yml](../.github/workflows/deploy-pages.yml) | No |
| `main` | Push | Yes — automatic GitHub Pages publish |

After CI succeeds on a push to `development`, [.github/workflows/promote-to-main.yml](../.github/workflows/promote-to-main.yml) creates a PR to `main` and enables squash auto-merge. Manual deploy remains available via `workflow_dispatch`.

- **GitHub Pages source:** **GitHub Actions**, not `main` or `master` as a static branch.
- **Legacy branches:** `master` and `gh-pages` can be removed once this flow is confirmed.
- **Stale remotes:** pre-Nuxt feature branches (`colors-page`, `qa`, `staging`, etc.) are safe to delete when no longer needed.
