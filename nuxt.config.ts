// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  future: {
    compatibilityVersion: 4,
  },
  telemetry: false,

  $development: {
    ssr: true,
    devtools: {
      enabled: true,
    },
  },

  $production: {
    ssr: true,
  },

  runtimeConfig: {
    apiLocal: import.meta.env.API_LOCAL_URL,
    public: {
      apiBase: import.meta.env.APP_URL,
      apiPrefix: "/api/v1",
      storageBase: import.meta.env.APP_URL + "/storage/",
      providers: {
        google: {
          name: "Google",
          icon: "",
          color: "gray",
        },
      },
    },
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/ui",
    "nuxt-security",
  ],

  css: ["~/assets/css/main.css"],

  app: {
    head: {
      title: "Home",
      titleTemplate: "%s | Nuxt3 Starter",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  security: {
    headers: {
      crossOriginEmbedderPolicy: "unsafe-none",
      crossOriginOpenerPolicy: "same-origin-allow-popups",
      contentSecurityPolicy: {
        "img-src": [
          "'self'",
          "data:",
          "https://*",
          import.meta.env.APP_URL || "http://127.0.0.1:8000",
        ],
      },
    },
  },

  dayjs: {
    locales: ["en"],
    plugins: ["relativeTime", "utc", "timezone"],
    defaultLocale: "en",
    defaultTimezone: import.meta.env.APP_TIMEZONE,
  },

  typescript: {
    strict: false,
  },
});
