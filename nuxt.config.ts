export default defineNuxtConfig({
  app: {
    head: {
      title: 'DASH Statistics',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/img/favicon.ico' },
      ]
    },
  },
  css: ['vuetify/lib/styles/main.sass'],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  modules: [
    '@vueuse/nuxt',
    '@intlify/nuxt3',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-highcharts',
    ['nuxt3-lazy-load', {
      images: true,
      videos: true,
      audios: true,
      iframes: true,
      native: false,
      directiveOnly: true,
      defaultImage: '/img/pics/blank.png',
    }],
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
  ],
  imports: {
    dirs: ['stores'],
  },
  intlify: {
    localeDir: 'locales',
    vueI18n: {
      locale: 'en'
    }
  },
    
})