<template lang="pug">
article.role
  header.role__head
    p.kicker {{ kindLabel }}
    h2 {{ role.title }}
    p.role__org {{ role.organization }}
    p.role__meta(v-if="meta") {{ meta }}
    p.role__context(v-if="role.context") {{ role.context }}
  ul.role__bullets(v-if="role.bullets.length")
    li(v-for="bullet in role.bullets" :key="bullet") {{ bullet }}
</template>

<script setup lang="ts">
import type { Role, RoleKind } from '#shared/experience'
import { assertNever } from '#shared/assert-never'

const props = defineProps<{
  role: Role
}>()

const kindLabel = computed(() => labelForKind(props.role.kind))

const meta = computed(() => {
  const dates = [props.role.start, props.role.end].filter(Boolean).join(' – ')
  return [props.role.location, dates].filter(Boolean).join(' · ')
})

function labelForKind(kind: RoleKind): string {
  switch (kind) {
    case 'founder':
      return 'Practice'
    case 'engineering':
      return 'Engineering'
    case 'community':
      return 'Community'
    case 'education':
      return 'Education'
    default:
      return assertNever(kind)
  }
}
</script>

<style lang="scss" scoped>
.role {
  padding: 1.75rem 0;
  border-top: 1px solid $line;
}

h2 {
  font-size: clamp(1.5rem, 3.4vw, 2.1rem);
  margin-bottom: 0.35rem;
}

.role__org,
.role__meta,
.role__context {
  margin: 0;
  font-family: $font-ui;
  font-size: 0.82rem;
  letter-spacing: 0.04em;
}

.role__org {
  color: $ink;
}

.role__bullets {
  margin: 1rem 0 0;
  padding-left: 1.1rem;
  color: $ink-soft;
}
</style>
