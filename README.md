# tamaramack.github.io

Professional profile and legacy experiments for [Tamara Mack](https://tamaramack.github.io/) — Founder of HyperActivity, Creative Technologist.

## Live site

| URL | Role |
| --- | --- |
| [tamaramack.github.io](https://tamaramack.github.io/) | Published profile (Nuxt, GitHub Pages root) |
| [likwidmack.com](https://likwidmack.com) | Creative work and experiments |

## Repository layout

| Path | Stack | Role |
| --- | --- | --- |
| `apps/portfolio/` | Nuxt 4, Nitro, TypeScript, Pug, SCSS | **Publish target** — professional profile |
| Repository root | Vue CLI 2, Vue 2 | Legacy experiments (unchanged) |

## Related repositories

| Repository | URL |
| --- | --- |
| This site (source) | [github.com/tamaramack/tamaramack.github.io](https://github.com/tamaramack/tamaramack.github.io) |
| Nx portfolio | [github.com/likwidmack/portfolio](https://github.com/likwidmack/portfolio) |

## Development

```bash
cd apps/portfolio
pnpm install
pnpm dev          # Nitro SSR dev server
pnpm typecheck
pnpm build:pages  # static output for GitHub Pages
```

See [apps/portfolio/README.md](apps/portfolio/README.md) and [docs/architecture.md](docs/architecture.md) for detail.

## Deployment

Push to `development` runs [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml), which builds `apps/portfolio` with Nitro's `github_pages` preset and deploys to GitHub Pages.

**Settings → Pages → Source** should be **GitHub Actions** (not the legacy `main` or `master` branch).

## Branches

| Branch | Purpose |
| --- | --- |
| `development` | Default branch; deploys to GitHub Pages |
| `main` | Legacy Pages source — retire after Actions deploy is confirmed |
| `master` | Legacy protected branch — unprotect and delete when Pages migrates |

Stale feature branches from the Vue CLI era can be deleted once no longer needed.

## Repository topics

Set in **Settings → General → Topics** (or run locally with `gh auth login`):

```
nuxt nitro typescript portfolio creative-technologist hyperactivity github-pages pug scss ssr vue tamara-mack
```

```bash
gh api --method PUT repos/tamaramack/tamaramack.github.io/topics \
  --input '{"names":["nuxt","nitro","typescript","portfolio","creative-technologist","hyperactivity","github-pages","pug","scss","ssr","vue","tamara-mack"]}'
```

Also update the repository description to: *Professional profile for Tamara Mack — Founder of HyperActivity, Creative Technologist. Nuxt 4 at tamaramack.github.io.*

## Documentation

- [docs/architecture.md](docs/architecture.md) — runtime, layout, URLs
- [docs/superpowers/specs/](docs/superpowers/specs/) — design specs
