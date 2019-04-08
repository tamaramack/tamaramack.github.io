<template lang="pug">
  InputGroup(:listModel="PetsModel", type="checkbox")
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { FormComponents } from '@/components';
import { InputItems, InputList } from '@/js/models/input';

const { mapGetters } = createNamespacedHelpers('rover');
const { InputGroup } = FormComponents;

export default {
  name: 'PetTypes',
  components: {
    InputGroup
  },
  data() {
    return {
      types: []
    };
  },
  computed: {
    ...mapGetters(['petTypes']),
    PetsModel() {
      const list = [...this.petTypes].map(type => new InputItems(type));
      return new InputList({
        desc: 'Select your Pet(s)',
        group: 'pet',
        key: 'types',
        model: this,
        list: list
      });
    }
  },
  watch: {
    types() {
      this.$store.commit('rover/updatePets', this.types);
    }
  }
};
</script>

<style scoped lang="scss">

</style>
