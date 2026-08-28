<template lang="pug">
.study
  p.kicker {{ project?.status }}
  h1 Search
  p.lede {{ project?.summary }}
  p The Rover-inspired faceted search stays at /rover so existing links keep working while the UI is rebuilt on Nitro.
  NuxtLink(to="/projects") All projects
</template>

<script setup lang="ts">
const { data: projects } = await useProjects()
const project = computed(() => projects.value.find(item => item.slug === 'rover'))

useHead({ title: 'Search' })
</script>

<style lang="scss" scoped>
.study {
  @include page-wrap;
}
</style>
