<template lang="pug">
  div
    label
      select(v-for="option in options")
        option(value="option.value", label="option.label", v-model="model[selectedKey]")
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
  ]
};
</script>

<style scoped lang="scss">

</style>
