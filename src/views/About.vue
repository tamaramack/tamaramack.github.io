<template lang="pug">
  div.about
    Navigation(page="about")
    h1 this is an about page
</template>

<script>
// @ is an alias to /src
import { Navigation } from '@/components';

export default {
  name: 'about',
  components: {
    Navigation
  }
};
</script>
