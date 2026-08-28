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
| `apps/profile/` | Nuxt 4, Nitro, TypeScript, Pug, SCSS | **Required** site source; GitHub Pages publish target for domain root |

**Do not overwrite the root page.** `/` is the root page route for [tamaramack.github.io](https://tamaramack.github.io/) — always served by `apps/profile/app/pages/index.vue` in the Nuxt app (`baseURL: '/'`). Do not add a competing app at the repository root or replace `/` with static HTML, Jekyll, or legacy Vue CLI code.

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

See [apps/profile/README.md](apps/profile/README.md) and [docs/architecture.md](docs/architecture.md) for detail.

## Deployment

| Branch | CI (build + typecheck) | Deploy to GitHub Pages |
| --- | --- | --- |
| `development` | On push and PR | No |
| `main` | On push | Yes (automatic) |
| Manual | Actions → Run workflow | Yes |

Pushes to `development` run [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml). When CI succeeds, [.github/workflows/promote-to-main.yml](.github/workflows/promote-to-main.yml) opens a PR from `development` → `main` and enables **squash auto-merge**. Merging to `main` deploys the site.

**Settings → Pages → Source** should be **GitHub Actions**.

**Settings → General → Pull Requests:** enable **Allow auto-merge**. On `main` branch rules, allow squash merges only if you want to enforce that method.

## Branches

| Branch | Purpose |
| --- | --- |
| `development` | Default integration branch; CI on push/PR |
| `main` | Production; squash-merged from `development`; deploys GitHub Pages |
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
