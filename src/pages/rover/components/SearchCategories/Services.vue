<template lang="pug">
  InputGroup(:listModel="serviceModel", type="radio")
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { FormComponents } from '@/components';
import { InputList } from '@/js/models/input';

const { mapGetters } = createNamespacedHelpers('rover');
const { InputGroup } = FormComponents;

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
        this.$store.commit('rover/updateService', newService);
      }
    }
  }
};
</script>

<style scoped lang="scss">

</style>
