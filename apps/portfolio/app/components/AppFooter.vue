<template lang="pug">
footer.app-footer
  .app-footer__inner
    p Portfolio
    p.app-footer__meta Built with Nuxt SSR, Nitro, TypeScript, Pug, and SCSS.
</template>

<style lang="scss" scoped>
.app-footer {
  border-top: 1px solid $line;
}

.app-footer__inner {
  @include page-wrap;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 1.4rem;
  color: $muted;
  font-size: 0.92rem;

  p {
    margin: 0;
    color: inherit;
  }
}

@media (max-width: 40rem) {
  .app-footer__inner {
    flex-direction: column;
  }
}
</style>
