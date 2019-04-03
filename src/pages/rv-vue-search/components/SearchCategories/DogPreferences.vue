<template lang="pug">
  InputGroup(:listModel="dogPreferModel", type="radio")
</template>

<script>
import InputGroup from '@/components/form/InputGroup.vue';
import { InputItems, InputList } from '@/js/models';
import { mapGetters } from 'vuex';

export default {
  name: 'DogPreferences',
  components: {
    InputGroup
  },
  computed: {
    ...mapGetters([
      'dogPreferences',
      'dogPreference'
    ]),
    dogPreferModel() {
      const list = [...this.dogPreferences].map(type => new InputItems(type));
      return new InputList({
        desc: 'Select a Dog Choice',
        group: 'dog_preference',
        key: 'sitterDog',
        model: this,
        list: list
      });
    },
    sitterDog: {
      get() {
        return this.dogPreference;
      },
      set(newPreference) {
        this.$store.commit('updateDogPreference', newPreference);
      }
    }
  }
};
</script>

<style scoped lang="scss">

</style>
