<template lang="pug">
.firm(v-if="profile")
  header.firm__hero
    p.kicker {{ profile.organization.legalName }}
    h1 An independent practice for AI-first software.
    p.lede {{ profile.organization.summary }}
  section.firm__body
    article
      h2 How the firm works
      p I define software and UI architecture, technical requirements, scope, delivery strategy, and engineering standards for client engagements. The work is specialist: not a staffing mill, and not a slide deck that never touches the product.
      p Agentic systems are designed so people can see state, approve action, and keep control. Immersive and spatial surfaces get the same standard as any other interface — they have to be usable, not merely novel.
    article
      h2 Guild, not headcount
      p Longer-term, HyperActivity is a professional guild: engineering standards, continuing education, reputation, fair compensation, and independent practice. Teams form around a project, then dissolve without asking anyone to surrender their own shop.
      p
        a(:href="profile.linkedIn" target="_blank" rel="noopener") Reach me on LinkedIn
</template>

<script setup lang="ts">
const { data: profile } = await useProfile()

useHead({ title: 'HyperActivity' })
</script>

<style lang="scss" scoped>
.firm__hero,
.firm__body {
  @include page-wrap;
}

h1 {
  max-width: 14ch;
  font-size: clamp(2.6rem, 7vw, 4.8rem);
}

.firm__body {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 2.5rem;
  margin-top: 2.5rem;
}

h2 {
  font-size: 1.8rem;
}
</style>
