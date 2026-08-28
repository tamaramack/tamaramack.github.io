<template lang="pug">
  div
    label(:for="id")
      input(:id="id", :type="type", :disabled="disabled", :placeholder="placeholder",
      :min="minDate", :max="maxDate", v-model="model[selectedKey]")
</template>

<script>
export default {
  name: 'DateTime',
  props: [
    'id',
    // time, date, datetime
    'type',
    'disabled',
    'minDate',
    'maxDate',
    'placeholder',
    'selectedKey',
    'required',
    'model'
  ]
};
</script>

<style scoped lang="scss">

</style>
