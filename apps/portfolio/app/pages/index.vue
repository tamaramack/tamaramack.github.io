<template lang="pug">
.home
  section.hero
    p.kicker Parallel portfolio
    h1 Works completed and explored.
    p.lede
      | A Nuxt SSR rebuild of the T Mack portfolio, running beside the original Vue CLI app.
      | Pages render through Nitro, with TypeScript, Pug templates, and SCSS.

  section.home-grid
    ProjectCard(v-for="project in projects" :key="project.slug" :project="project")
</template>

<script setup lang="ts">
const { data: projects } = await useProjects()

useHead({ title: 'Home' })
</script>

<style lang="scss" scoped>
.hero {
  @include page-wrap;
  padding-bottom: 2.5rem;
}

h1 {
  max-width: 14ch;
  font-size: clamp(2.6rem, 8vw, 5.4rem);
}

.home-grid {
  @include page-wrap;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem;
}
</style>
