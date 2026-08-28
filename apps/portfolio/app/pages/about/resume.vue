<template lang="pug">
.resume
  p.kicker About
  h1 Resume
  p.lede A dedicated resume page is part of the information architecture. Content will move here from the legacy app as this parallel project grows.
  NuxtLink(to="/about") Back to about
</template>

<script setup lang="ts">
useHead({ title: 'Resume' })
</script>

<style lang="scss" scoped>
.resume {
  @include page-wrap;
}
</style>
