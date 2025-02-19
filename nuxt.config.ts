// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  components: true, // Ensure components auto-import is enabled

  css: ['~/public/assets/css/main.css'],
  app: {
    script: [{ src: '/js/window.js' }], // Path relative to the public directory
  },
  ssr: false,
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: [
    ['@nuxtjs/google-fonts', {
      families: {
        'Cormorant Garamond': {
          wght: [300, 400, 500, 600, 700],
          ital: [300, 400, 500, 600, 700]
        },
        Outfit: {
          wght: [100, 200, 300, 400, 500, 600, 700, 800, 900]
        }
      },
      display: 'swap',
      download: true, // Ensures fonts are preloaded
      inject: true, // Automatically injects into <head>
    }]
  ],
})
