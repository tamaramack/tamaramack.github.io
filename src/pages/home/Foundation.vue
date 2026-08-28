<template lang="pug">
  div
    #body-container
      h1 Kitchen Sink
      p Everything but.
      Abide/
      Accordion/
      Badge/
      Breadcrumbs/
      Button/
      Callout/


</template>

<script>
import Abide from './components/Abide.vue';
import Accordion from './components/Accordion.vue';
import Badge from './components/Badge.vue';
import Breadcrumbs from './components/Breadcrumbs.vue';
import Button from './components/Button.vue';
import Callout from './components/Callout.vue';

export default {
  name: 'Foundation',
  foundation: true,
  components: {
    Button,
    Breadcrumbs,
    Accordion,
    Abide,
    Badge,
    Callout
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
    width: 95%;
    margin: auto;
    text-align: left;
  }
</style>
