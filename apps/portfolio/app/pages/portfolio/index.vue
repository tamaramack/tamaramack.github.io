<template lang="pug">
.portfolio(v-if="profile")
  header.portfolio__hero
    p.kicker Portfolio
    h1 Experiments, studies, and shipping code.
    p.lede Creative work lives at likwidmack.com. This page collects the repositories and source behind the profile site.
  section.portfolio__links
    article
      h2 likwidmack.com
      p Interactive studies, visual experiments, and creative technology work.
      a(:href="profile.personalSite" target="_blank" rel="noopener") likwidmack.com
    article
      h2 Nx portfolio
      p Nuxt 4 SSR portfolio with SQLite, Docker/Postgres, and AWS SAM — a separate codebase for full-stack delivery work.
      a(:href="profile.portfolioRepo" target="_blank" rel="noopener") github.com/likwidmack/portfolio
    article
      h2 Profile source
      p The Nuxt 4 app published at tamaramack.github.io — SSR through Nitro, prerendered for GitHub Pages.
      a(:href="profile.portfolioSource" target="_blank" rel="noopener") apps/portfolio on GitHub
      NuxtLink.more-link(to="/architecture") Nuxt architecture
    article
      h2 This repository
      p User site monorepo for the tamaramack.github.io profile.
      a(:href="profile.repository" target="_blank" rel="noopener") github.com/tamaramack/tamaramack.github.io
</template>

<script setup lang="ts">
const { data: profile } = await useProfile()

useHead({ title: 'Portfolio' })
</script>

<style lang="scss" scoped>
.portfolio__hero,
.portfolio__links {
  @include page-wrap;
}

h1 {
  max-width: 14ch;
  font-size: clamp(2.6rem, 7vw, 4.8rem);
}

.portfolio__links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 2.5rem;
  margin-top: 2.5rem;
}

h2 {
  font-size: 1.4rem;
}

article a,
article .more-link {
  display: inline-block;
  margin-top: 0.75rem;
  font-family: $font-ui;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
