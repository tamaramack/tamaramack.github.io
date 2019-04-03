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
import DateRange from './SearchCategories/DateRange.vue';
import PriceRange from './SearchCategories/PriceRange.vue';
import DogSizes from './SearchCategories/DogSizes.vue';
import ResidencePreferences from './SearchCategories/ResidencePreferences.vue';
import DogPreferences from './SearchCategories/DogPreferences.vue';
import Services from './SearchCategories/Services.vue';

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
      this.$store.commit('setUrlParameters', { data });
      // console.debug('Form changed', args, this.$store.state.urlParameters);
    }
  }
};
</script>

<style scoped lang="scss">

</style>
