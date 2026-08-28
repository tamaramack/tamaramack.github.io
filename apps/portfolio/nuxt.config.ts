// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: true,
  devtools: { enabled: true },
  app: {
    // User site https://tamaramack.github.io/ is served from domain root.
    baseURL: '/',
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Tamara Mack',
      titleTemplate: '%s · Tamara Mack',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Tamara Mack — Founder of HyperActivity and Creative Technologist. Architecture, intelligent interfaces, and technical delivery.'
        },
        {
          name: 'keywords',
          content: 'Tamara Mack, HyperActivity, creative technologist, software architecture, Nuxt, portfolio, Portland'
        },
        { name: 'author', content: 'Tamara Mack' },
        { name: 'theme-color', content: '#0b0d12' },
        { property: 'og:type', content: 'profile' },
        { property: 'og:title', content: 'Tamara Mack' },
        {
          property: 'og:description',
          content: 'Founder of HyperActivity. Creative Technologist.'
        },
        { property: 'og:url', content: 'https://tamaramack.github.io/' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Tamara Mack' },
        {
          name: 'twitter:description',
          content: 'Founder of HyperActivity. Creative Technologist.'
        }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },
  css: ['~/assets/scss/main.scss'],
  typescript: {
    strict: true,
    typeCheck: false
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/practice',
        '/hyperactivity',
        '/portfolio',
        '/architecture',
        '/about',
        '/about/resume',
        '/api/profile',
        '/api/practice',
        '/api/experience',
        '/api/health'
      ]
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData(content: string, filename: string) {
            if (filename.includes('/assets/scss/') || filename.includes('\\assets\\scss\\')) {
              return content
            }

            return `@use "~/assets/scss/abstracts" as *;\n${content}`
          }
        }
      }
    }
  }
})
