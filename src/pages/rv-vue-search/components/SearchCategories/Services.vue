<template lang="pug">
  InputGroup(:listModel="serviceModel", type="radio")
</template>

<script>
import InputGroup from '@/components/form/InputGroup.vue';
import { InputItems, InputList } from '@/js/models';
import { mapGetters } from 'vuex';

export default {
  name: 'Services',
  components: {
    InputGroup
  },
  computed: {
    ...mapGetters([
      'mapServices',
      'selectedService'
    ]),
    serviceModel() {
      return new InputList({
        desc: 'Select a Service Type',
        group: 'service_type',
        key: 'service',
        model: this,
        list: this.mapServices
      });
    },
    service: {
      get() {
        return this.selectedService;
      },
      set(newService) {
        this.$store.commit('updateService', newService);
      }
    }
  }
};
</script>

<style scoped lang="scss">

</style>
