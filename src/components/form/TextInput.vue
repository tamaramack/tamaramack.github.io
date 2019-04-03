<template lang="pug">
  div
    label(:for="id")
      input(v-if="type !== 'textarea'", :id="id", :type="type", :disabled="disabled",
      :placeholder="placeholder", :pattern="regex", v-model="model[selectedKey]")
      textarea(v-else, :id="id", :type="type", :disabled="disabled", :placeholder="placeholder",
      v-model="model[selectedKey]")
</template>

<script>
export default {
  name: 'TextInput',
  props: [
    'id',
    // textarea, text, search, url, email
    'type',
    'disabled',
    'regex',
    'placeholder',
    'selectedKey',
    'model'
  ]
};
</script>

<style scoped lang="scss">

</style>
