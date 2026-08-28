<template lang="pug">
.practice
  header.practice__hero
    p.kicker Practice
    h1 Creative technology, with architecture attached.
    p.lede
      | Engagements start with the shape of the system — who it serves, what must remain visible, and which specialists the work actually needs.
  CapabilityCard(v-for="area in areas" :key="area.slug" :area="area")
</template>

<script setup lang="ts">
const { data: areas } = await usePractice()

useHead({ title: 'Practice' })
</script>

<style lang="scss" scoped>
.practice,
.practice__hero {
  @include page-wrap;
}

h1 {
  max-width: 16ch;
  font-size: clamp(2.6rem, 7vw, 4.8rem);
}
</style>
