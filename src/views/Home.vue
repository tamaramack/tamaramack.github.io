<template lang="pug">
  div.home
    router-view
      img(alt="TMack logo" width=350 src="../assets/RedMoon.png")
      HelloWorld(msg="Welcome to Your Vue.js App")/
</template>

<script>
// @ is an alias to /src
import { HelloWorld } from '@/components';

export default {
  name: 'home',
  page: {
    title: 'Home'
  },
  components: {
    HelloWorld
  }
};
</script>

<style lang="scss" scoped>
  .home {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
