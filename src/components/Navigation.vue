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
              li: router-link(to="/rover") Search
          li: router-link(to="/about") About
      .top-bar-right
        GeoLocation(:module="module", v-if="isSearch || showLocation")
</template>

<script>
// eslint-disable-next-line import/no-cycle
import { GeoLocation } from '@/components';

export default {
  name: 'Navigation',
  foundation,
  components: {
    GeoLocation
  },
  props: ['page', 'module', 'showLocation'],
  data() {
    return {
      isSearch: this.page === 'search'
    };
  }
};

function foundation(Foundation, $) {
  // resize body padding based off nav bar height
  const nav = document.getElementById('nav-container');
  const setBodySize = (e) => {
    const height = $(nav).height();
    $('.content-size').css('height', `calc(100vh - ${height}px)`);
  };

  $(window).resize(setBodySize);
  $(nav).resize(setBodySize);
  setBodySize();
}
</script>

<style lang="scss" scoped>
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
