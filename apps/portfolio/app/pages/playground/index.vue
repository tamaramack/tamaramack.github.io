<template lang="pug">
.study
  p.kicker {{ project?.status }}
  h1 Playground
  p.lede {{ project?.summary }}
  p Layout and justification experiments from the Vue playground now have a Nuxt home at the same path.
  NuxtLink(to="/projects") All projects
</template>

<script setup lang="ts">
const { data: projects } = await useProjects()
const project = computed(() => projects.value.find(item => item.slug === 'playground'))

useHead({ title: 'Playground' })
</script>

<style lang="scss" scoped>
.study {
  @include page-wrap;
}
</style>
