# T Mack portfolio (Nuxt)

Parallel SSR professional profile for [tamaramack.github.io](https://tamaramack.github.io/).

Tamara Mack — Founder of HyperActivity, Creative Technologist.

Stack: **Nuxt 4**, **Nitro**, **TypeScript**, **Pug**, **SCSS**.

The original Vue CLI app remains at the repository root. This app is the new architecture and the GitHub Pages publish target.

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

After the workflow runs, set **Settings → Pages → Source** to **GitHub Actions** if it is still on the legacy `master` branch.
