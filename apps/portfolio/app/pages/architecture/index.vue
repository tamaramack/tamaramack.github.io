<template lang="pug">
.architecture(v-if="profile")
  header.architecture__hero
    p.kicker Nuxt 4
    h1 SSR profile, prerendered for GitHub Pages.
    p.lede This site is a Nuxt 4 app with Nitro on the server, Vue 3 in the browser, and a single content layer in shared/ so dev SSR and static publish stay in sync.
  section.architecture__stack
    h2 Stack
    ul.stack
      li Nuxt 4 — app router, layouts, file-based pages
      li Vue 3 — composition API, script setup, Pug templates
      li Nitro — SSR server, API routes, GitHub Pages preset
      li TypeScript — shared types across app and server
      li Pug + SCSS — templates and the nocturnal atelier visual system
  section.architecture__layout
    h2 Layout
    pre.layout
      | apps/portfolio/
      |   app/              pages, layouts, components, composables, SCSS
      |   server/api/       Nitro GET routes
      |   shared/           profile, practice, experience content
      |   nuxt.config.ts    SSR, prerender, head meta
  section.architecture__flow
    h2 Data flow
    ol.flow
      li Content is authored in shared/ as typed modules.
      li Nitro exposes the same data at /api/profile, /api/practice, /api/experience.
      li Composables (useProfile, usePractice, useExperience) fetch those routes during SSR.
      li pnpm build:pages prerenders HTML + JSON payloads for GitHub Pages at the domain root.
  section.architecture__deploy
    h2 Deploy
    p
      | development runs CI (typecheck + build). A squash PR promotes to
      code main
      | , which publishes through GitHub Actions. Manual deploy is available from the Actions tab.
    a(:href="profile.portfolioSource" target="_blank" rel="noopener") View apps/portfolio on GitHub
</template>

<script setup lang="ts">
const { data: profile } = await useProfile()

useHead({ title: 'Architecture' })
</script>

<style lang="scss" scoped>
.architecture__hero,
.architecture__stack,
.architecture__layout,
.architecture__flow,
.architecture__deploy {
  @include page-wrap;
}

h1 {
  max-width: 14ch;
  font-size: clamp(2.6rem, 7vw, 4.8rem);
}

section {
  margin-top: 2.5rem;
}

h2 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.stack,
.flow {
  margin: 0;
  padding-left: 1.2rem;
  color: $ink-soft;
}

.stack li,
.flow li {
  margin-bottom: 0.5rem;
}

.layout {
  margin: 0;
  padding: 1.25rem;
  border: 1px solid $line;
  font-family: $font-ui;
  font-size: 0.78rem;
  line-height: 1.6;
  color: $ink-soft;
  overflow-x: auto;
}

code {
  font-family: $font-ui;
  font-size: 0.9em;
  color: $accent;
}

a {
  display: inline-block;
  margin-top: 1rem;
  font-family: $font-ui;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
