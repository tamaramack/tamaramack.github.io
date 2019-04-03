<template lang="pug">
  div#nav-container
    div.title-bar(data-responsive-toggle="nav", data-hide-for="medium")
      button.menu-icon(type="button", data-toggle="nav")
      .title-bar-title Menu
    div#nav.top-bar
      .top-bar-left
        ul.dropdown.menu(data-dropdown-menu)
          li.menu-text Rover SEARCH
          li: router-link(to="/") Search
          li(v-if="!isSearch"): router-link(to="/home") Home
          li(v-if="!isSearch"): router-link(to="/about") About
      .top-bar-right(v-if="isSearch")
        GeoLocation
</template>

<script>
import GeoLocation from '@/components/GeoLocation.vue';

export default {
  name: 'Navigation',
  components: {
    GeoLocation
  },
  props: ['page'],
  data() {
    return {
      isSearch: this.page === 'search'
    };
  }
};
</script>

<style scoped>

</style>
