import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-04-15',

  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@pinia/nuxt',
  ],
  
  css:['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
