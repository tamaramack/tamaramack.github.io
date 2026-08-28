<template lang="pug">
footer.app-footer
  .app-footer__inner
    p Tamara Mack · {{ profile?.organization.legalName }}
    nav.app-footer__links(v-if="profile")
      NuxtLink(to="/portfolio") Portfolio
      a(:href="profile.repository" target="_blank" rel="noopener") GitHub
      a(:href="profile.portfolioSource" target="_blank" rel="noopener") Source
      a(:href="profile.portfolioRepo" target="_blank" rel="noopener") Nx portfolio
      a(:href="profile.personalSite" target="_blank" rel="noopener") likwidmack.com
      a(:href="profile.linkedIn" target="_blank" rel="noopener") LinkedIn
</template>

<script setup lang="ts">
const { data: profile } = await useProfile()
</script>

<style lang="scss" scoped>
.app-footer {
  border-top: 1px solid $line;
}

.app-footer__inner {
  @include page-wrap;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  padding-block: 1.35rem;
  color: $muted;
  font-family: $font-ui;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;

  p {
    margin: 0;
    color: inherit;
    flex-shrink: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
}

.app-footer__links {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 1rem 1.35rem;
}

@media (max-width: 40rem) {
  .app-footer__inner {
    flex-direction: column;
  }
}
</style>
