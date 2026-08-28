<template lang="pug">
.projects
  .projects__intro
    p.kicker Studio
    h1 Public studies
    p.lede These are independent experiments, not client case studies. They stay on this site because the craft should be visible even when the work is personal.
  .projects__grid
    ProjectCard(v-for="project in projects" :key="project.slug" :project="project")
</template>

<script setup lang="ts">
const { data: projects } = await useProjects()

useHead({ title: 'Studio' })
</script>

<style lang="scss" scoped>
.projects__intro,
.projects__grid {
  @include page-wrap;
}

h1 {
  font-size: clamp(2.6rem, 7vw, 4.8rem);
}

.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}
</style>
