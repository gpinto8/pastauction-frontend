// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: "123",
    // Keys within public are also exposed client-side
    public: {
      baseURL: "https://api.example.com/",
    },
  },

  modules: ["nuxt-headlessui", "@pinia/nuxt"],
  headlessui: {
    prefix: "",
  },
  // Only valid on preview
  routeRules: {
    "/**": { headers: { "Access-Control-Allow-Origin": "*" } },
  },
  // Only valid on serve
  webpack: {
    devMiddleware: {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Past Auction",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/public/favicon.svg" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&display=swap",
        },
      ],
    },
  },

  css: [
    "~/assets/css/main.css",
    "vue-toast-notification/dist/theme-bootstrap.css",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  components: true,
  ssr: false,
});
