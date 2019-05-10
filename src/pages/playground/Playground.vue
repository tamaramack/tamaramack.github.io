<template lang="pug">
div
  Navigation(page="playground")
  h1 Playground

  div.grid-x.grid-padding-x
    div.cell.small-12.medium-4.large-3.text-left

    div.cell.small-12.medium-8.large-9

</template>

<script>
import { Navigation } from '@/components';

export default {
  name: 'playground',
  components: {
    Navigation
  }
};
</script>

<style lang="scss" scoped>
  .form {
  }
</style>
