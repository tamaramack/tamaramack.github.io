<template lang="pug">
.resume
  header.resume__hero
    p.kicker Resume
    h1 Selected experience
    p.lede Public roles only. Dates appear where they are on the record.
  RoleEntry(v-for="role in roles" :key="role.organization + role.title" :role="role")
</template>

<script setup lang="ts">
const { data: roles } = await useExperience()

useHead({ title: 'Resume' })
</script>

<style lang="scss" scoped>
.resume,
.resume__hero {
  @include page-wrap;
}

h1 {
  font-size: clamp(2.6rem, 7vw, 4.8rem);
}
</style>
