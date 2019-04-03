<template lang="pug">
  InputGroup(:listModel="residentPreferModel", type="radio")
</template>

<script>
import InputGroup from '@/components/form/InputGroup.vue';
import { InputItems, InputList } from '@/js/models';
import { mapGetters } from 'vuex';

export default {
  name: 'ResidencePreferences',
  components: {
    InputGroup
  },
  computed: {
    ...mapGetters([
      'residencePreferences',
      'residencePreference'
    ]),
    residentPreferModel() {
      const list = [...this.residencePreferences]
        .map(type => new InputItems(type));
      return new InputList({
        desc: 'Select a Residence Choice',
        group: 'residence_preference',
        key: 'sitterResidence',
        model: this,
        list: list
      });
    },
    sitterResidence: {
      get() {
        return this.residencePreference;
      },
      set(newPreference) {
        this.$store.commit('updateResidencePreference', newPreference);
      }
    }
  }
};
</script>

<style scoped lang="scss">

</style>
