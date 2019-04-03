<template lang="pug">
  fieldset
    legend {{desc}}
    .input-list.flex-container.flex-dir-row
      .flex-child-auto(v-for="item in list")
        SelectInput(:item="item", :selectedKey="selectedKey",
        :group="group", :model="model", :type="type")
</template>

<script>
import { InputList } from '@/js/models';
import SelectInput from '@/components/form/SelectInput.vue';

export default {
  name: 'InputGroup',
  components: { SelectInput },
  props: {
    listModel: InputList,
    type: String
  },
  data() {
    return {
      desc: this.listModel.desc,
      group: this.listModel.group,
      selectedKey: this.listModel.key,
      model: this.listModel.model
    };
  },
  computed: {
    list() {
      return this.listModel.list;
    }
  }
};
</script>

<style scoped lang="scss">
  .input-list {
    flex-wrap: wrap;
  }
</style>
