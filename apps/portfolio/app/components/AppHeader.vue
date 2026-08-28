<template lang="pug">
header.app-header
  .app-header__inner
    NuxtLink.brand(to="/")
      span.brand__moon(aria-hidden="true")
      span.brand__text
        strong T Mack
        small Portfolio
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
        li.nav-group
          span Projects
          ul
            li(v-for="project in PROJECTS" :key="project.slug")
              NuxtLink(:to="project.href" @click="open = false") {{ project.title }}
</template>

<script setup lang="ts">
import { PROJECTS } from '#shared/projects'

const open = ref(false)

const navItems = [
  { to: '/', label: 'Home', exact: true },
  { to: '/projects', label: 'All work', exact: false },
  { to: '/about', label: 'About', exact: false }
] as const
</script>

<style lang="scss" scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(16px);
  background: rgba($bg, 0.78);
  border-bottom: 1px solid $line;
}

.app-header__inner {
  @include page-wrap;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 4.25rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: $ink;
  text-decoration: none;
}

.brand__moon {
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 50%;
  background:
    radial-gradient(circle at 30% 30%, $gold, $accent 42%, $accent-deep 70%, $bg 71%);
  box-shadow: 0 0 0 3px rgba($accent, 0.18);
}

.brand__text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;

  strong {
    font-family: $font-display;
    font-size: 1.05rem;
    font-weight: 600;
  }

  small {
    color: $muted;
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
}

.nav-toggle {
  display: none;
  border: 1px solid $line;
  border-radius: 999px;
  background: transparent;
  color: $ink;
  padding: 0.4rem 0.9rem;
}

nav ul {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

nav a {
  color: $ink-soft;
  text-decoration: none;
  font-weight: 500;

  &.router-link-active {
    color: $ink;
  }
}

.nav-group {
  position: relative;

  > span {
    color: $muted;
    font-size: 0.85rem;
  }

  ul {
    display: none;
    position: absolute;
    right: 0;
    top: calc(100% + 0.5rem);
    min-width: 12rem;
    padding: 0.6rem;
    border-radius: $radius;
    background: $bg-elevated;
    @include hairline;
    flex-direction: column;
    align-items: stretch;
    gap: 0.2rem;
  }

  &:hover ul,
  &:focus-within ul {
    display: flex;
  }
}

@media (max-width: 48rem) {
  .nav-toggle {
    display: inline-flex;
  }

  nav {
    display: none;
    position: absolute;
    inset: 4.25rem $gutter auto;
    padding: 1rem;
    border-radius: $radius;
    background: $bg-elevated;
    @include hairline;
  }

  nav[data-open] {
    display: block;
  }

  nav ul,
  .nav-group ul {
    display: flex;
    flex-direction: column;
    position: static;
    background: transparent;
    border: 0;
    padding: 0;
    min-width: 0;
  }
}
</style>
