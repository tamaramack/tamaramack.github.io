<template lang="pug">
  #geo-container
    .grid-x.grid-padding-x
      .cell.callout.alert(v-if="error")
        | {{ error }}

      .cell.label.success.small-12(v-else-if="latitude && longitude")
        span.geo(:title="`${latitude}, ${longitude}`")
          | location acquired

      .cell.callout.warning(v-else)
        | SET LOCATION
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'GeoLocation',
  mounted,
  props: ['module'],
  data() {
    return {
      modulePath: (this.module && this.module.length) ? `${this.module}/` : ''
    };
  },
  methods: {
    getLocation() {
      this.$store.dispatch(`${this.modulePath}geolocation`);
    }
  },
  computed: {
    ...mapState({
      latitude: state => state.latitude && (state.latitude).toFixed(4),
      longitude: state => state.longitude && (state.longitude).toFixed(4)
    }),
    error() {
      const msg = this.$store.state.geoError;
      if (msg) return `ERROR: ${msg}`;
      return false;
    }
  }
};


function mounted() {
  this.$store.dispatch(`${this.modulePath}geolocation`);
}

</script>

<style scoped lang="scss">
  #geo-container {
    text-align: left;
  }

  .geo {
    display: inline;
    padding: 5px;
  }
</style>
