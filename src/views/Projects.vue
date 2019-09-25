<template lang="pug">
  div.projects
    Navigation(page="projects")
    router-view
</template>

<script>
import { Navigation } from '@/components';

export default {
  name: 'projects',
  page: {
    title: 'Projects'
  },
  components: {
    Navigation
  }
};
</script>

<style lang="scss" scoped>

</style>
