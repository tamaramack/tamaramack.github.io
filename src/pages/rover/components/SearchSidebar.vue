<template lang="pug">
  div
    form#major-form(@change="onFormChange")
      Services
      div(v-if="selectedService")
        PriceRange
        DateRange
        ResidencePreferences
        DogPreferences
        DogSizes
      hr
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import {
  DateRange,
  PriceRange,
  DogSizes,
  ResidencePreferences,
  DogPreferences,
  Services
} from './SearchCategories';

const { mapState, mapGetters } = createNamespacedHelpers('rover');

export default {
  name: 'SearchSidebar',
  components: {
    DateRange,
    PriceRange,
    DogSizes,
    ResidencePreferences,
    DogPreferences,
    Services
  },
  props: ['text'],
  computed: {
    ...mapGetters([
      'selectedService',
      'petTypes',
      'parameters'
    ]),
    ...mapState({
      count(state) {
        return state.count;
      },
      listings(state) {
        return state.listings;
      }
    })
  },
  methods: {
    onFormChange(...args) {
      const data = this.$.param(this.parameters, true);
      this.$store.commit('rover/setUrlParameters', { data });
      // console.debug('Form changed', args, this.$store.state.urlParameters);
    }
  }
};
</script>

<style scoped lang="scss">

</style>
