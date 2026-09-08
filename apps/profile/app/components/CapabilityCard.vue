<template lang="pug">
article.capability
  p.kicker {{ index }}
  h2 {{ area.title }}
  p {{ area.summary }}
</template>

<script setup lang="ts">
import type { PracticeArea } from '#shared/practice'
import { practiceLabel } from '#shared/practice'

const props = defineProps<{
  area: PracticeArea
}>()

const index = computed(() => practiceLabel(props.area.slug))
</script>

<style lang="scss" scoped>
.capability {
  padding: 1.4rem 0;
  border-top: 1px solid $line;
}

h2 {
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  margin-bottom: 0.45rem;
}
</style>
