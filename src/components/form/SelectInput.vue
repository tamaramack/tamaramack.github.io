<template lang="pug">
  .select-input-item.button.inform.small.small-only-expanded(:class="{selected: isSelected}")
    input(:id="id", :type="type", :name="group", :value="value",
    v-model="model[selectedKey]")
    label(:for="id") {{label}}
</template>

<script>
import { InputItems } from '@/js/models/input';

export default {
  name: 'SelectInput',
  props: {
    item: InputItems,
    type: String,
    selectedKey: String,
    group: String,
    model: Object
  },
  data() {
    return {
      id: this.item.id,
      value: this.item.value,
      label: this.item.label
    };
  },
  computed: {
    isSelected() {
      const selected = this.model[this.selectedKey];
      if (Array.isArray(selected)) return selected.includes(this.value);

      return selected === this.value;
    }
  }
};
</script>

<style scoped lang="scss">
  .select-input-item {
    text-align: center;
    padding: .25em;

    input {
      visibility: hidden;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: 0;
    }

    &.focus {
      border-color: $primary-color;
    }

    &.selected {
      background-color: $primary-color;

      label {
        color: $white;
      }
    }

    label {
      text-transform: capitalize;
    }
  }
</style>
