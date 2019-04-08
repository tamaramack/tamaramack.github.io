<template lang="pug">
  fieldset
    legend Select Your Date Range
      .input-group
        span.input-group-label Start
        kendo-dateinput.input-group-field(type="date", :min="defStart",
        :format="'yyyy-MM-dd'", v-model="start")
      .between-range to
      .input-group
        span.input-group-label End
        kendo-dateinput.input-group-field(type="date", :min="defStart",
        :format="'yyyy-MM-dd'", v-model="end")
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapGetters } = createNamespacedHelpers('rover');

export default {
  name: 'DateRange',
  computed: {
    ...mapGetters([
      'dateRange'
    ]),
    defStart() {
      return new Date();
    },
    start: {
      get() {
        const { start } = this.dateRange;
        if (start) return new Date(start);
        return this.defStart;
      },
      set(start) {
        this.$store.commit('rover/updateDate', { start });
      }
    },
    end: {
      get() {
        const { end } = this.dateRange;
        if (end) return new Date(end);
        return this.start;
      },
      set(end) {
        this.$store.commit('rover/updateDate', { end });
      }
    }
  }
};
</script>

<style scoped lang="scss">
  .between-range {
    padding: .2em;
  }
</style>
