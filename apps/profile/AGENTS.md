# Agent rules — apps/profile

App-scoped rules for coding agents working on the Nuxt profile site.

## Site source

- This directory is the site source and GitHub Pages publish target for the domain root (`https://tamaramack.github.io/`).
- The Vue CLI app formerly at the repository root was removed in Aug 2026. Do not reintroduce it (or any other root-level static/legacy app) as the site source.

## Root route

- `/` is served by `app/pages/index.vue` → `https://tamaramack.github.io/`.
- Do not replace that root route with a competing page, static HTML, Jekyll, or legacy Vue CLI code.

## Human docs

- [README.md](README.md) — routes, scripts, related links
- [../../docs/architecture.md](../../docs/architecture.md) — stack and deploy detail
- [../../AGENTS.md](../../AGENTS.md) — repo-wide agent rules
