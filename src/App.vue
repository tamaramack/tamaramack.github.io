<template lang="pug">
  #app.grid-y.medium-grid-frame
    #app-header.cell.shrink.medium-cell-block-container
      Navigation

    #app-body.cell.medium-auto.medium-cell-block-container
      router-view

    #app-footer.cell.shrink.callout.secondary
      Footer
</template>

<script>
// @ is an alias to /src
import { Navigation, Footer } from '@/components';

export default {
  page: {
    title: 'Home'
  },
  components: {
    Navigation,
    Footer
  }
};
</script>

<style lang="scss">
  @include foundation-everything(true);
  body { overflow: hidden }
  #app {}
  #app-body {
    overflow: auto;
  }
  #app-footer { margin: 0; }
</style>
