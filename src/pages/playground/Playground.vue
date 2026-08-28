<template lang="pug">
div
  h1 Playground

  div.grid-x.grid-padding-x
    div.cell.small-12.medium-3.large-1.text-left

    div.cell.small-12.medium-9.large-11
      Justify

</template>

<script>
import Justify from '@/pages/playground/components/Justify';

export default {
  name: 'playground',
  components: {
    Justify
  }
};
</script>

<style lang="scss" scoped>
  .form {
  }
</style>
