import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  components: true,

  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  app: {
    head: {
      title: 'chetan.codes — Chetan Dhargalkar',
      meta: [
        { name: 'description', content: 'Creative portfolio of Chetan Dhargalkar' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ],
    },
    script: [{ src: '/js/window.js' }],
  },

  ssr: false,

  modules: [
    '@nuxtjs/tailwindcss',
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
      download: true,
      inject: true
    }]
  ]
})