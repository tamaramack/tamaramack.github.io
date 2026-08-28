<template lang="pug">
.error
  p.kicker {{ status }}
  h1 {{ title }}
  p.lede {{ description }}
  NuxtLink(to="/") Return home
</template>

<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode?: number
    statusMessage?: string
    message?: string
  }
}>()

const status = computed(() => props.error.statusCode ?? 500)
const title = computed(() => (status.value === 404 ? 'Page not found' : 'Something broke'))
const description = computed(
  () => props.error.statusMessage || props.error.message || 'The Nitro renderer could not finish this request.'
)

useHead({ title: title.value })
</script>

<style lang="scss" scoped>
.error {
  @include page-wrap;
  padding-block: 4rem;
}
</style>
