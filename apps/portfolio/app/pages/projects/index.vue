<template lang="pug">
.projects
  .projects__intro
    p.kicker Catalog
    h1 Independent studies
    p.lede Server-rendered from a Nitro route so the same catalog hydrates in SSR and on GitHub Pages.
  .projects__grid
    ProjectCard(v-for="project in projects" :key="project.slug" :project="project")
</template>

<script setup lang="ts">
const { data: projects } = await useProjects()

useHead({ title: 'Projects' })
</script>

<style lang="scss" scoped>
.projects__intro,
.projects__grid {
  @include page-wrap;
}

.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}
</style>
