<template lang="pug">
.home(v-if="profile")
  section.hero
    p.kicker {{ profile.location }}
    h1
      span.name {{ profile.name }}
      span.line {{ profile.headline }}
    p.lede {{ profile.lede }}
    p.hero__actions
      NuxtLink(to="/hyperactivity") HyperActivity
      a(:href="profile.linkedIn" target="_blank" rel="noopener") LinkedIn

  section.home-practice
    header
      p.kicker Practice
      h2 What I take on
    CapabilityCard(v-for="area in areas.slice(0, 3)" :key="area.slug" :area="area")
    NuxtLink.more(to="/practice") Full practice

  section.home-studio
    header
      p.kicker Studio
      h2 Selected public studies
    .home-studio__grid
      ProjectCard(v-for="project in projects" :key="project.slug" :project="project")
</template>

<script setup lang="ts">
const { data: profile } = await useProfile()
const { data: areas } = await usePractice()
const { data: projects } = await useProjects()

useHead({
  title: 'Home',
  script: profile.value
    ? [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: profile.value.name,
            jobTitle: 'Founder & Principal Architect',
            worksFor: {
              '@type': 'Organization',
              name: profile.value.organization.legalName
            },
            url: profile.value.site,
            sameAs: [profile.value.linkedIn],
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Portland',
              addressRegion: 'OR',
              addressCountry: 'US'
            }
          })
        }
      ]
    : []
})
</script>

<style lang="scss" scoped>
.hero,
.home-practice,
.home-studio {
  @include page-wrap;
}

.hero {
  padding-bottom: 3rem;
}

h1 {
  display: flex;
  flex-direction: column;
  gap: 0.35em;
  max-width: 18ch;
  font-size: clamp(3.2rem, 10vw, 7.2rem);
}

.name {
  color: $ink;
}

.line {
  color: $accent;
  font-size: 0.42em;
  letter-spacing: 0.02em;
}

.hero__actions {
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;
  font-family: $font-ui;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.78rem;
}

.home-practice,
.home-studio {
  margin-top: 1rem;
}

.home-studio__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem;
  margin-top: 1.2rem;
}

.more {
  display: inline-block;
  margin-top: 1.25rem;
  font-family: $font-ui;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.78rem;
}
</style>
