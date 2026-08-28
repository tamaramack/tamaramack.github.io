<template lang="pug">
.study
  p.kicker {{ project?.status }}
  h1 Colors
  p.lede {{ project?.summary }}
  p This study originally modeled color spaces and swatch cards. The Nuxt route is in place so the rebuilt UI can drop in without changing the public URL.
  NuxtLink(to="/projects") All projects
</template>

<script setup lang="ts">
const { data: projects } = await useProjects()
const project = computed(() => projects.value.find(item => item.slug === 'colors'))

useHead({ title: 'Colors' })
</script>

<style lang="scss" scoped>
.study {
  @include page-wrap;
}
</style>
