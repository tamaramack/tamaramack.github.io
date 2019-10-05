<template lang="pug">
  #nav-container
    div#nav-title.title-bar(data-responsive-toggle="nav", data-hide-for="medium")
      button.menu-icon(type="button", data-toggle="nav")
      .title-bar-title TM Portfolio
    nav#nav.top-bar
      .top-bar-left
        ul.dropdown.menu(data-dropdown-menu)
          li.menu-text
            router-link.h4(to="/") T Mack Portfolio
          li
            router-link(to="/projects") Projects
            ul.menu.vertical
              li: router-link(to="/colors") Colors
              li: router-link(to="/substring") Substring
              li: router-link(to="/rover") Search
          li: router-link(to="/about") About
      .top-bar-right
        component(:is="navigationComponent")
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Navigation',
  foundation: {
    init: false,
    callback: foundation
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['navigationComponent'])
  }
};

function foundation(Foundation, $) {
  // resize body padding based off nav bar height
  const navContainer = document.getElementById('nav-container');
  const navTitle = new Foundation.ResponsiveToggle($('#nav-title'));
  // const navResponsiveMenu = new Foundation.ResponsiveMenu($('#nav ul.menu'));
  const navDropdownMenu = new Foundation.DropdownMenu($('#nav ul.dropdown.menu'));
}
</script>

<style lang="scss" scoped>
  #nav {
    h1, h2, h3, h4, h5 {
      margin: 0;
      padding: 0;
    }

    .menu-text a {
      padding: 0 0 0 2rem;
      background: url('../assets/RedMoon_th.png') no-repeat;
      background-size: contain;
      background-clip: padding-box;
    }
  }

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
