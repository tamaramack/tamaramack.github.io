<template lang="pug">
  div
    label(:for="id")
      input(:id="id", type="number", :disabled="disabled", :min="minNumber", :max="maxNumber"
      :placeholder="placeholder", v-model="model[selectedKey]")
</template>

<script>
export default {
  name: 'NumberInput',
  props: [
    'id',
    'disabled',
    'minNumber',
    'maxNumber',
    'placeholder',
    'selectedKey',
    'model'
  ]
};
</script>

<style scoped lang="scss">

</style>
