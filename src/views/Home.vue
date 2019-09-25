<template lang="pug">
  div.home
    Navigation(page="home")
    img(alt="Vue logo" src="../assets/logo.png")
    HelloWorld(msg="Welcome to Your Vue.js App")/
</template>

<script>
// @ is an alias to /src
import { HelloWorld, Navigation } from '@/components';

export default {
  name: 'home',
  page: {
    title: 'Home'
  },
  components: {
    Navigation,
    HelloWorld
  }
};
</script>
