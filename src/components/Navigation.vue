<template lang="pug">
  #nav-container
    div.title-bar(data-responsive-toggle="nav", data-hide-for="medium")
      button.menu-icon(type="button", data-toggle="nav")
      .title-bar-title Menu
    div#nav.top-bar
      .top-bar-left
        ul.dropdown.menu(data-dropdown-menu)
          li.menu-text T Mack Portfolio
          li: router-link(to="/") Home
          li
            router-link(to="/projects") Projects
            ul.menu.vertical
              li(v-if="!isSearch"): router-link(to="/colors") Colors
              li(v-if="!isSearch"): router-link(to="/substring") Substring
              li(v-if="!isSearch"): router-link(to="/foundation") Foundation
              li: router-link(to="/rover") Search
          li: router-link(to="/about") About
      .top-bar-right
        GeoLocation(:module="module", v-if="isSearch || showLocation")
</template>

<script>
// import { GeoLocation } from '@/components';

export default {
  name: 'Navigation',
  mounted,
  components: {
    GeoLocation: this.$GeoLocation
  },
  props: ['page', 'module', 'showLocation'],
  data() {
    return {
      isSearch: this.page === 'search'
    };
  }
};

function mounted() {
  this.$(document).foundation();
  this.$nextTick(() => {
    // resize body padding based off nav bar height
    const nav = document.getElementById('nav-container');
    const setBodySize = (e) => {
      const height = this.$(nav).height();
      this.$('.content-size').css('height', `calc(100vh - ${height}px)`);
    };

    this.$(window).resize(setBodySize);
    this.$(nav).resize(setBodySize);
    setBodySize();
  });
}
</script>

<style scoped>
  .no-js {
    @include breakpoint(small only) {
      .top-bar {
        display: none;
      }
    }

    @include breakpoint(medium) {
      .title-bar {
        display: none;
      }
    }
  }
</style>
