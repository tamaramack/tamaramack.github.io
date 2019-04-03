<template lang="pug">
  InputGroup(:listModel="PetsModel", type="checkbox")
</template>

<script>
import InputGroup from '@/components/form/InputGroup.vue';
import { InputItems, InputList } from '@/js/models';
import { mapGetters } from 'vuex';

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
      this.$store.commit('updatePets', this.types);
    }
  }
};
</script>

<style scoped lang="scss">

</style>
