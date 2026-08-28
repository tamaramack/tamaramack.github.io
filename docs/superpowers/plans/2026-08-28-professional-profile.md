# Professional Profile Implementation Plan

> **For agentic workers:** Execute inline in this session. Steps use checkbox syntax for tracking.

**Goal:** Rewrite `apps/portfolio` into Tamara Mack’s professional profile as Founder of HyperActivity and Creative Technologist.

**Architecture:** Keep Nuxt SSR + Nitro. Move professional copy into `shared/` modules and Nitro GET routes. Recast `/projects` as Studio. Add `/practice` and `/hyperactivity`.

**Tech Stack:** Nuxt 4, Nitro, TypeScript, Pug, SCSS, GitHub Pages `github_pages` preset at `/`.

## Global Constraints

- Public copy only; no invented clients, dates, or degrees
- No home or mailing addresses
- `baseURL` remains `/`
- Pug templates and SCSS; exhaustive `switch` for new unions
- LinkedIn is the contact CTA: `https://www.linkedin.com/in/likwidmack`

---

### Task 1: Content model and APIs

**Files:**
- Create: `apps/portfolio/shared/profile.ts`
- Create: `apps/portfolio/shared/practice.ts`
- Create: `apps/portfolio/shared/experience.ts`
- Modify: `apps/portfolio/shared/projects.ts`
- Create: `apps/portfolio/server/api/profile.get.ts`
- Create: `apps/portfolio/server/api/practice.get.ts`
- Create: `apps/portfolio/server/api/experience.get.ts`
- Create: `apps/portfolio/app/composables/useProfile.ts`, `usePractice.ts`, `useExperience.ts`
- Modify: `apps/portfolio/nuxt.config.ts` prerender routes

**Produces:** `PROFILE`, `PRACTICE_AREAS`, `EXPERIENCE`, typed fetches

- [x] Implement shared modules, Nitro routes, composables, prerender `/practice` and `/hyperactivity`

### Task 2: Visual system and chrome

**Files:**
- Modify: `apps/portfolio/app/assets/scss/_abstracts.scss`, `main.scss`
- Modify: `apps/portfolio/app/app.vue` (fonts)
- Modify: `apps/portfolio/app/components/AppHeader.vue`, `AppFooter.vue`
- Modify: `apps/portfolio/nuxt.config.ts` head/title

- [x] Nocturnal atelier chrome; nav is professional; studio is secondary

### Task 3: Pages

**Files:**
- Modify: `apps/portfolio/app/pages/index.vue`
- Create: `apps/portfolio/app/pages/practice/index.vue`
- Create: `apps/portfolio/app/pages/hyperactivity/index.vue`
- Modify: about, resume, projects, study pages
- Create: `apps/portfolio/app/components/CapabilityCard.vue`, `RoleEntry.vue`

- [x] Rewrite public copy and page structure

### Task 4: Verify

- [x] `pnpm typecheck` and `pnpm build:pages`
- [x] Browser pass on home, practice, HyperActivity, about, resume, studio
