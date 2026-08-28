<template lang="pug">
.study
  p.kicker {{ project?.status }}
  h1 Substring
  p.lede {{ project?.summary }}
  p Large-string readers and mapping experiments stay on this URL. Nested reader routes from the Vue app can be added as Nuxt dynamic pages.
  NuxtLink(to="/projects") All projects
</template>

<script setup lang="ts">
const { data: projects } = await useProjects()
const project = computed(() => projects.value.find(item => item.slug === 'substring'))

useHead({ title: 'Substring' })
</script>

<style lang="scss" scoped>
.study {
  @include page-wrap;
}
</style>
