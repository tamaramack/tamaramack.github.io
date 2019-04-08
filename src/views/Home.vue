<template lang="pug">
  div.home
    Navigation(page="home")
    img(alt="Vue logo" src="../assets/logo.png")
    HelloWorld(msg="Welcome to Your Vue.js App")/
</template>

<script>
// @ is an alias to /src
import { HelloWorld } from '@/components';

export default {
  name: 'home',
  components: {
    HelloWorld
  }
};
</script>
