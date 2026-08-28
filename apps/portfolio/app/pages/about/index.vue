<template lang="pug">
.about
  header.about__hero
    p.kicker About
    h1 About T Mack and the like.
    p.lede Everything you may want to read is still landing here, now through a Nuxt layout instead of the Vue CLI shell.

  section.about__grid
    aside
      h2 Sidebar
      p Nested reading columns used to live in Foundation’s XY grid. This rebuild keeps independent columns without that runtime.
      NuxtLink.about__resume(to="/about/resume") Resume
    article
      h2 Independent body of work
      p This parallel app keeps the same information architecture — home, projects, about — while swapping the engine to Nuxt, Nitro, TypeScript, Pug, and SCSS.
      p The original Vue 2 CLI project remains at the repository root so experiments can move over one study at a time.
</template>

<script setup lang="ts">
useHead({ title: 'About' })
</script>

<style lang="scss" scoped>
.about__hero,
.about__grid {
  @include page-wrap;
}

.about__grid {
  display: grid;
  grid-template-columns: minmax(12rem, 0.4fr) minmax(0, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

.about__resume {
  display: inline-block;
  margin-top: 1rem;
}

@media (max-width: 48rem) {
  .about__grid {
    grid-template-columns: 1fr;
  }
}
</style>
