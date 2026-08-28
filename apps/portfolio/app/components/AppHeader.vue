<template lang="pug">
header.app-header
  .app-header__inner
    NuxtLink.brand(to="/")
      span.brand__mark(aria-hidden="true")
      span.brand__text
        strong Tamara Mack
        small HyperActivity
    button.nav-toggle(
      type="button"
      :aria-expanded="open"
      aria-controls="site-nav"
      @click="open = !open"
    ) Menu
    nav#site-nav(:data-open="open || undefined")
      ul
        li(v-for="item in navItems" :key="item.to")
          NuxtLink(
            :to="item.to"
            :active-class="item.exact ? '' : 'router-link-active'"
            :exact-active-class="item.exact ? 'router-link-active' : undefined"
            @click="open = false"
          ) {{ item.label }}
        li
          a(:href="PROFILE.personalSite" target="_blank" rel="noopener") likwidmack.com
        li
          a(:href="PROFILE.linkedIn" target="_blank" rel="noopener") LinkedIn
</template>

<script setup lang="ts">
import { PROFILE } from '#shared/profile'

const open = ref(false)

const navItems = [
  { to: '/practice', label: 'Practice', exact: false },
  { to: '/hyperactivity', label: 'HyperActivity', exact: false },
  { to: '/portfolio', label: 'Portfolio', exact: false },
  { to: '/architecture', label: 'Architecture', exact: false },
  { to: '/about', label: 'About', exact: false },
  { to: '/about/resume', label: 'Resume', exact: false }
] as const
</script>

<style lang="scss" scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(16px);
  background: rgba($bg, 0.82);
  border-bottom: 1px solid $line;
}

.app-header__inner {
  @include page-wrap;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 4.4rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: $ink;
  text-decoration: none;
}

.brand__mark {
  width: 0.85rem;
  height: 0.85rem;
  border-radius: 50%;
  background: $accent;
  box-shadow: 0 0 0 0 rgba($accent, 0.45);
  animation: pulse 2.8s ease-out infinite;
}

.brand__text {
  display: flex;
  flex-direction: column;
  line-height: 1.05;

  strong {
    font-family: $font-ui;
    font-size: 0.86rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  small {
    @include label;
    color: $muted;
    font-size: 0.62rem;
  }
}

.nav-toggle {
  display: none;
  border: 1px solid $line;
  border-radius: 999px;
  background: transparent;
  color: $ink;
  padding: 0.4rem 0.9rem;
  font-family: $font-ui;
}

nav ul {
  display: flex;
  align-items: center;
  gap: 1.35rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

nav a {
  color: $ink-soft;
  text-decoration: none;
  font-family: $font-ui;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  &.router-link-active {
    color: $ink;
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba($accent, 0.5);
  }

  70% {
    box-shadow: 0 0 0 10px rgba($accent, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba($accent, 0);
  }
}

@media (max-width: 64rem) {
  .nav-toggle {
    display: inline-flex;
  }

  nav {
    display: none;
    position: absolute;
    inset: 4.4rem $gutter auto;
    padding: 1rem;
    background: $bg-elevated;
    @include hairline;
  }

  nav[data-open] {
    display: block;
  }

  nav ul {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
