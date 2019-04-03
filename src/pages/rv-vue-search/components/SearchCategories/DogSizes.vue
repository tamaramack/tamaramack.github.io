<template lang="pug">
  InputGroup(:listModel="dogSizeModel", type="checkbox")
</template>

<script>
import InputGroup from '@/components/form/InputGroup.vue';
import { InputItems, InputList } from '@/js/models';
import { mapGetters } from 'vuex';

export default {
  name: 'DogSizes',
  components: {
    InputGroup
  },
  data() {
    return {
      sizes: []
    };
  },
  computed: {
    ...mapGetters(['dogSizes']),
    dogSizeModel() {
      const list = [...this.dogSizes].map(type => new InputItems(type));
      return new InputList({
        desc: 'Select your Dog(s) Size',
        group: 'dog_size',
        key: 'sizes',
        model: this,
        list: list
      });
    }
  },
  watch: {
    sizes() {
      this.$store.commit('updateDogSize', this.sizes);
    }
  }
};
</script>

<style scoped lang="scss"></style>
