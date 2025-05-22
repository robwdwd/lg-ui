// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      siteTitle: process.env.NUXT_PUBLIC_SITE_TITLE || 'Network Looking Glass',
      maxLocsPing: Number(process.env.NUXT_PUBLIC_MAX_LOCS_PING) || 3,
      maxDestPing: Number(process.env.NUXT_PUBLIC_MAX_DEST_PING) || 5,
      maxLocsBgp: Number(process.env.NUXT_PUBLIC_MAX_LOCS_BGP) || 3,
      maxDestBgp: Number(process.env.NUXT_PUBLIC_MAX_DEST_BGP) || 5,
      ourAsn: Number(process.env.NUXT_PUBLIC_OUR_ASN) || 64512
    }
  },
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon'
  ],

  fonts: {
    defaults: {
      weights: [300, 400, 500, 700],
      styles: ['normal', 'italic']
    },
  },

  css: ['~/assets/css/main.css'],

  future: {
    compatibilityVersion: 4
  },

  $test: {
    vite: {
      server: {
        allowedHosts: true,
        hmr: {
          protocol: "wss",
          clientPort: 443,
          path: "hmr/",
        },
      },
    },
  },
  compatibilityDate: '2024-11-27'
})
