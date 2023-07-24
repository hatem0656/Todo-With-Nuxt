export default defineNuxtConfig({
  modules: ["nuxt-icon", "@pinia/nuxt"],
  css: ["@/assets/scss/global.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_vars.scss" as *;',
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      Todos_URL: process.env.Todos_URL,
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
    },
  },
});
