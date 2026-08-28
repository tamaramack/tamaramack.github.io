<template lang="pug">
div
  h2 BreadCrumbs
  nav(aria-label="You are here:", role="navigation")
    ul.breadcrumbs
      li: a(href="#0") Home
      li: a(href="#0") Features
      li.disabled Gene Splicing
      li
        span.show-for-sr Current:
        | Cloning
</template>

<script>
export default {
  name: 'Breadcrumbs'
};
</script>

<style lang="scss" scoped>

</style>
