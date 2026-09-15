# Agent rules — tamaramack.github.io

Rules for coding agents working in this repository. Human-facing docs stay in README files and `docs/`.

## Branch landing (required)

- Never push commits directly to `development` or `main`.
- Required path: feature branch → pull request into `development` → (after CI succeeds) pull request from `development` into `main`.
- Do not use `git push origin development`, `git push origin main`, or ruleset/admin bypass to land work.
- Opening and merging PRs (including enabling auto-merge) is required; direct pushes are forbidden even when credentials could bypass branch rules.
- The promote workflow already opens `development` → `main` as a PR; do not replace that with a direct push to `main`.

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
