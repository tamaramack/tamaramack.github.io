<template lang="pug">
article.project-card
  p.kicker {{ statusLabel }}
  h2
    NuxtLink(:to="project.href") {{ project.title }}
  p {{ project.summary }}
</template>

<script setup lang="ts">
import type { Project, ProjectStatus } from '#shared/projects'
import { assertNever } from '#shared/assert-never'

const props = defineProps<{
  project: Project
}>()

const statusLabel = computed(() => labelForStatus(props.project.status))

function labelForStatus(status: ProjectStatus): string {
  switch (status) {
    case 'live':
      return 'Live study'
    case 'in-progress':
      return 'In progress'
    case 'archive':
      return 'Archive'
    default:
      return assertNever(status)
  }
}
</script>

<style lang="scss" scoped>
.project-card {
  display: flex;
  flex-direction: column;
  min-height: 14rem;
  padding: 1.5rem;
  border-radius: $radius;
  background: $bg-elevated;
  @include hairline;
}

h2 {
  margin-bottom: 0.5rem;
  font-size: 1.7rem;

  a {
    color: inherit;
    text-decoration: none;
  }
}
</style>
