<template lang="pug">
  fieldset
    legend Select Your Price Range
    .grid-x
      .input-group.cell.auto
        span.input-group-label $
        input.input-group-field(type="number", step="1", :min="defMin",
        :max="defMax", :placeholder="'min ' + defMin", v-model="min")
      .between-range.cell.shrink to
      .input-group.cell.auto
        span.input-group-label $
        input.input-group-field(type="number", step="1", :max="defMax",
        :min="defMin", :placeholder="'max ' + defMax", v-model="max")
</template>

<script>
import { InputItems, InputList } from '@/js/models';
import { mapGetters } from 'vuex';

export default {
  name: 'PriceRange',
  computed: {
    ...mapGetters([
      'priceRange'
    ]),
    defMin() {
      return this.priceRange.default_min;
    },
    defMax() {
      return this.priceRange.default_max;
    },
    min: {
      get() {
        return this.priceRange.min || this.priceRange.default_min;
      },
      set(min) {
        this.$store.commit('updatePrice', { min });
      }
    },
    max: {
      get() {
        return this.priceRange.max || this.priceRange.default_max;
      },
      set(max) {
        this.$store.commit('updatePrice', { max });
      }
    }
  }
};
</script>

<style scoped lang="scss">
  .between-range {
    padding: .3em;
  }
</style>
