# Agent rules — tamaramack.github.io

Rules for coding agents working in this repository. Human-facing docs stay in README files and `docs/`.

## Published root page

- `apps/profile/` is the only GitHub Pages / domain-root site source.
- `/` must remain `apps/profile/app/pages/index.vue` (`baseURL: '/'`).
- Do not add a competing app at the repository root.
- Do not replace `/` with static HTML, Jekyll, or legacy Vue CLI code.

## Nested agent guides

| Path | Scope |
| --- | --- |
| [apps/profile/AGENTS.md](apps/profile/AGENTS.md) | Profile app root-route and publish-target rules |
| [docs/AGENTS.md](docs/AGENTS.md) | Docs-scoped published-root-page rule |

## Human docs

| Path | Audience |
| --- | --- |
| [README.md](README.md) | Repo overview, setup, deploy |
| [apps/profile/README.md](apps/profile/README.md) | Profile app routes and scripts |
| [docs/architecture.md](docs/architecture.md) | Stack, data flow, GitHub Pages deploy |
| [docs/superpowers/specs/2026-08-28-professional-profile-design.md](docs/superpowers/specs/2026-08-28-professional-profile-design.md) | Voice and content-honesty constraints when editing bio/claims copy |
