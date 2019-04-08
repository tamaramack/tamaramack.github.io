<template lang="pug">
  InputGroup(:listModel="residentPreferModel", type="radio")
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { FormComponents } from '@/components';
import { InputItems, InputList } from '@/js/models/input';

const { mapGetters } = createNamespacedHelpers('rover');
const { InputGroup } = FormComponents;

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
        this.$store.commit('rover/updateResidencePreference', newPreference);
      }
    }
  }
};
</script>

<style scoped lang="scss">

</style>
