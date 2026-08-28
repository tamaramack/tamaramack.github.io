# Parallel Nuxt portfolio

This repository now has two apps:

- **Legacy Vue CLI 3 / Vue 2 app** at the repository root. It stays in place so existing experiments are not rewritten in one pass.
- **Parallel Nuxt 4 portfolio** in `apps/portfolio`. This is the architecture going forward: **SSR through Nitro**, TypeScript, Pug templates, and SCSS.

## Runtime

`nuxt dev` and `nuxt build` produce a Nitro Node server (`ssr: true`). Pages can fetch `/api/projects` and `/api/health` from server routes.

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

Public URLs: `/` (profile), `/practice`, `/hyperactivity`, `/about`, `/about/resume`, `/projects` (studio), plus study routes.
