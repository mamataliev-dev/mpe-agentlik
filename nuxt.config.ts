export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/assets/images/logo.png",
        },
      ],
    },
    pageTransition: {
      name: "page",
      mode: "out-in"
    }
  },
  i18n: {
    // strategy: 'prefix_except_default',
    locales: [
      'en',
      'uz',
      'ru'
    ],
    defaultLocale: 'uz',
    vueI18n: './i18n.config.ts'
  },
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxt/ui",
    "@nuxtjs/tailwindcss",
    "nuxt-swiper",
  ],
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
    },
  },
  css: ["~/assets/style/main.scss"],
  colorMode: {
    preference: "light",
  },
});
