<template lang="pug">
  .callout
    .grid-x
      .cell.medium-2.small-3
        img.thumbnail(:src="person.thumb", :alt="'Photo of ' + person.person_name")
      .cell.auto.callout.secondary
        h3 {{person.person_name}}
        span {{person.location}}
</template>

<script>
export default {
  name: 'PersonSummaryCard',
  props: [
    'person'
  ]
};
</script>

<style scoped lang="scss">

</style>
