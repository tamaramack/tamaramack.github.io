<template lang="pug">
  #body-container
    h1 Kitchen Sink
    p Everything but.
    Abide/
</template>

<script>
import Abide from '@/components/foundation/Abide.vue';
// import Foundation from 'foundation-sites';

export default {
  name: 'Foundation',
  components: {
    Abide
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
