<template lang="pug">
  div.home
    router-view
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  page: {
    title: 'Home',
    view: 'home'
  },
  components: {}
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
