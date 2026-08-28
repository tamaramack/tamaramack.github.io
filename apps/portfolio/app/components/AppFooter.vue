<template lang="pug">
footer.app-footer
  .app-footer__inner
    p Tamara Mack · {{ profile?.organization.legalName }}
    a(:href="profile?.linkedIn" target="_blank" rel="noopener") LinkedIn
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
  gap: 1rem;
  padding-block: 1.35rem;
  color: $muted;
  font-family: $font-ui;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;

  p {
    margin: 0;
    color: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
}

@media (max-width: 40rem) {
  .app-footer__inner {
    flex-direction: column;
  }
}
</style>
