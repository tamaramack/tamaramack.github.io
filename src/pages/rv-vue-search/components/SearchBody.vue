<template lang="pug">
  div
    h2 Sitters in your local Area &nbsp;
      small {{count}}
      small(v-if="fetch")  Loading...
    ul.no-bullet(v-if="!!listings.length", v-for="item in listings")
      li
        PersonSummaryCard(:person="item")
    div(v-if="!listings.length")
      h3.subheader Select Categories to Find your Sitter.

</template>

<script>
import { mapState } from 'vuex';
import PersonSummaryCard from '@/components/PersonSummaryCard.vue';

export default {
  name: 'SearchBody',
  props: ['text'],
  components: {
    PersonSummaryCard
  },
  computed: {
    ...mapState({
      fetch(state) {
        return state.fetchData;
      },
      count(state) {
        return state.count;
      },
      listings(state) {
        return state.listings || [];
      }
    })
  }
};
</script>

<style scoped lang="scss">

</style>
