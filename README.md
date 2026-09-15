# tamaramack.github.io

Professional profile for [Tamara Gisele Mack](https://tamaramack.github.io/) — Founder of HyperActivity, Creative Technologist.

## Live site

| URL | Role |
| --- | --- |
| [tamaramack.github.io](https://tamaramack.github.io/) | Published profile (Nuxt, GitHub Pages root) |
| [likwidmack.com](https://likwidmack.com) | Creative work and experiments |

## Repository layout

| Path | Stack | Role |
| --- | --- | --- |
| `apps/profile/` | Nuxt 4, Nitro, TypeScript, Pug, SCSS | Site source; GitHub Pages publish target for domain root |
| `apps/portfolio/` | Nx / Nuxt (planned) | Portfolio repo — [likwidmack/portfolio](https://github.com/likwidmack/portfolio) |

The live site root (`/`) for [tamaramack.github.io](https://tamaramack.github.io/) is served by `apps/profile/app/pages/index.vue` in the Nuxt app (`baseURL: '/'`).

For AI agents, see [AGENTS.md](AGENTS.md).

## Related repositories

| Repository | URL |
| --- | --- |
| This site (source) | [github.com/tamaramack/tamaramack.github.io](https://github.com/tamaramack/tamaramack.github.io) |
| Nx portfolio | [github.com/likwidmack/portfolio](https://github.com/likwidmack/portfolio) |

## Development

```bash
cd apps/profile
pnpm install
pnpm dev          # Nitro SSR dev server
pnpm typecheck
pnpm build:pages  # static output for GitHub Pages
```

Or from the repository root: `pnpm dev`, `pnpm build:pages`, `pnpm typecheck`.

See [apps/profile/README.md](apps/profile/README.md), [apps/portfolio/README.md](apps/portfolio/README.md), and [docs/architecture.md](docs/architecture.md) for detail.

## Deployment

| Branch | How changes land | CI (build + typecheck) | Deploy to GitHub Pages |
| --- | --- | --- | --- |
| `development` | Pull request only (no direct pushes) | On push and PR | No |
| `main` | Pull request from `development` only (no direct pushes) | On push and PR | Yes (after promote merge) |
| Manual | Actions → Run workflow | — | Yes |

Feature work lands via PR into `development`. Successful CI on `development` runs [.github/workflows/promote-to-main.yml](.github/workflows/promote-to-main.yml), which opens a PR from `development` → `main`, enables **squash auto-merge**, then dispatches **Deploy to GitHub Pages** on `main` after that merge (token-authored merges do not fire a normal `push` deploy).

**Settings → Pages → Source** should be **GitHub Actions**.

**Settings → General → Pull Requests:** enable **Allow auto-merge**. Branch rulesets require a pull request before merging to `development` and `main`.

## Branches

| Branch | Purpose |
| --- | --- |
| `development` | Default integration branch; PR target for feature work; CI on push/PR |
| `main` | Production; PR from `development` only; deploys GitHub Pages |
| `master` | Legacy — unprotect and delete when no longer needed |

Stale feature branches from the Vue CLI era can be deleted once no longer needed.

## Repository topics

Set in **Settings → General → Topics** (or run locally with `gh auth login`):

```
nuxt nitro typescript portfolio creative-technologist hyperactivity github-pages pug scss ssr vue tamara-mack
```

```powershell
gh api --method PUT repos/tamaramack/tamaramack.github.io/topics -f "names[]=nuxt" -f "names[]=nitro" -f "names[]=typescript" -f "names[]=portfolio" -f "names[]=creative-technologist" -f "names[]=hyperactivity" -f "names[]=github-pages" -f "names[]=pug" -f "names[]=scss" -f "names[]=ssr" -f "names[]=vue" -f "names[]=tamara-mack"
```

On macOS/Linux you can also pass JSON: `gh api --method PUT repos/tamaramack/tamaramack.github.io/topics --input topics.json`

Also update the repository description to: *Professional profile for Tamara Gisele Mack — Founder of HyperActivity, Creative Technologist. Nuxt 4 at tamaramack.github.io.*

## Documentation

- [docs/README.md](docs/README.md) — documentation index
- [tamaramack.github.io/architecture](https://tamaramack.github.io/architecture) — live architecture page
- [docs/architecture.md](docs/architecture.md) — full Nuxt 4 stack, data flow, GitHub Pages deploy
- [docs/superpowers/specs/](docs/superpowers/specs/) — design specs
