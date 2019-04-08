<template lang="pug">
  #body-container
    Navigation(page="foundation", :showLocation="location")
    h1 Kitchen Sink
    p Everything but.
    Abide/
</template>

<script>
import Abide from './components/Abide.vue';
import { Navigation } from '@/components';
// import Foundation from 'foundation-sites';

export default {
  name: 'Foundation',
  components: {
    Navigation,
    Abide
  },
  data() {
    return {
      location: false
    };
  }
};
</script>

<style scoped lang="scss">
  #body-container {
    width: 80%;
    margin: auto;
    text-align: left;
  }
</style>
