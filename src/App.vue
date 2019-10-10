<template lang="pug">
  #app.grid-y.medium-grid-frame
    #app-header.cell.shrink.medium-cell-block-container
      Navigation
      component(:is="viewMenuComponent")

    #app-body.cell.medium-auto.medium-cell-block-container
      router-view

    #app-footer.cell.shrink.callout.secondary
      Footer
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex';
import { Navigation, Footer } from '@/components';

export default {
  components: {
    Navigation,
    Footer
  },
  computed: {
    ...mapState(['activeView']),
    viewMenuComponent() {
      switch (this.activeView) {
        case 'home':
          return () => import('@/components/tmp/NavigationHome.vue');
        case 'projects':
          return () => import('@/components/tmp/NavigationProjects.vue');
        case 'about':
          return () => import('@/components/tmp/NavigationAbout.vue');
        default:
          return false;
      }
    }
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
