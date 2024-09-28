// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'vue3-carousel-nuxt', 'nuxt-lodash', "@nuxt/icon"],
  tailwindcss: {
    // Options
  },
  runtimeConfig: {
    apiDomain: process.env.API_DOMAIN,
    apiKey: process.env.API_KEY,

    public: {
      apiBase: process.env.API_BASE
    }
  },
  app: {
    pageTransition: {
      name: 'fade',
      mode: 'out-in' // default
    },
  }
})