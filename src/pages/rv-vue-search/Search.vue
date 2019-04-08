<template lang="pug">
  div
    Navigation(page="search", module="rover")
    div#search_container
      .search-content.grid-y.medium-grid-frame
        .cell.shrink.header.medium-cell-block-container
          h1 Find your Sitter

        .cell.medium-auto.medium-cell-block-container
          .grid-x.grid-padding-x

            .cell.medium-4.medium-cell-block-y
              SearchSidebar

            .cell.medium-8.medium-cell-block-y
              SearchBody

        .cell.shrink.footer
          .callout.secondary
            h3 Footer
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { Navigation } from '@/components';
import SearchSidebar from './components/SearchSidebar.vue';
import SearchBody from './components/SearchBody.vue';

const { mapState } = createNamespacedHelpers('rover');

export default {
  name: 'Search',
  components: {
    Navigation,
    SearchSidebar,
    SearchBody
  },
  computed: {
    ...mapState([
      'fetchData'
    ])
  }
};
</script>

<style scoped lang="scss">
  #search_container {
    max-width: 95%;
    width: auto;
    margin: auto;
  }

</style>
