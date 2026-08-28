<template lang="pug">
.about(v-if="profile")
  header.about__hero
    p.kicker About
    h1 A creative technologist who still owns the architecture.
    p.lede {{ profile.lede }}
  section.about__grid
    aside
      p {{ profile.name }}
      p {{ profile.location }}
      p Founder & Principal Architect
      p {{ profile.organization.legalName }}
      NuxtLink(to="/about/resume") Resume
      NuxtLink(to="/portfolio") Portfolio
      a(:href="profile.portfolioSource" target="_blank" rel="noopener") Source
      a(:href="profile.portfolioRepo" target="_blank" rel="noopener") Nx portfolio
      a(:href="profile.repository" target="_blank" rel="noopener") GitHub
      a(:href="profile.personalSite" target="_blank" rel="noopener") likwidmack.com
      a(:href="profile.linkedIn" target="_blank" rel="noopener") LinkedIn
    article
      h2 Path
      p At Nike I was a Senior Full-Stack Innovation Engineer in the Technology Innovations Office, on Sport Moment Experiences. The work was frontend and web services for prototypes, demos, and first launches — V/A/XR, dynamic 3D, and visualization that had to hold up in front of a global audience.
      p Before that I built web services and frontend systems at Big Fish Games, and senior product software at Bittrex. The consultancy is the same craft pointed at architecture: independent, specialist, and accountable for how the system feels when a person is in it.
      p From 2015 to 2018 I led Comcast TechWomen’s Seattle chapter. I studied at the University of North Texas.
</template>

<script setup lang="ts">
const { data: profile } = await useProfile()

useHead({ title: 'About' })
</script>

<style lang="scss" scoped>
.about__hero,
.about__grid {
  @include page-wrap;
}

h1 {
  max-width: 16ch;
  font-size: clamp(2.6rem, 7vw, 4.8rem);
}

.about__grid {
  display: grid;
  grid-template-columns: minmax(12rem, 0.38fr) minmax(0, 1fr);
  gap: 2.5rem;
  margin-top: 2.5rem;
}

aside {
  font-family: $font-ui;
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;

  p {
    margin: 0 0 0.35rem;
    color: $ink;
  }

  a {
    display: block;
    margin-top: 0.85rem;
  }
}

@media (max-width: 48rem) {
  .about__grid {
    grid-template-columns: 1fr;
  }
}
</style>
