<template lang="pug">
div
  h2 Button
  div
    a.button(href="#0") Learn More
    a.button(href="#features") View All Features

    button.success.button(type="button") Save
    button.alert.button(type="button") Delete

    a.tiny.button(href="#0") So Tiny
    a.small.button(href="#0") So Small
    a.large.button(href="#0") So Large
    a.expanded.button(href="#0") Such Expand

    div.button-group
      a.button One
      a.button Two
      a.button Three
</template>

<script>
export default {
  name: 'Button'
};
</script>

<style lang="scss" scoped>

</style>
