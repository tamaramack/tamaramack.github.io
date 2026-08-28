<template lang="pug">
.study
  p.kicker Studio · {{ project?.status }}
  h1 Search
  p.lede {{ project?.summary }}
  p A personal study of faceted search UI. Not a HyperActivity engagement.
  NuxtLink(to="/projects") All studies
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

h1 {
  font-size: clamp(2.6rem, 7vw, 4.8rem);
}
</style>
