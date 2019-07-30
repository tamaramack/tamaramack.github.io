<template lang="pug">
  div
    label {{desc}}
      select(v-model="selected")
        option(v-for="{value, label} in options", :value="value", :label="label") {{label}}
</template>

<script>
export default {
  name: 'Dropdown',
  props: [
    'desc',
    'options',
    'name',
    'isMulti',
    'selectedKey',
    'model'
  ],
  computed: {
    selected: {
      get() {
        return this.model[this.selectedKey];
      },
      set(value) {
        this.model[this.selectedKey] = value;
      }
    }
  }
};
</script>

<style scoped lang="scss">

</style>
