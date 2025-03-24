// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primeuix/themes/aura";

export default defineNuxtConfig({
  compatibilityDate: "2025-03-20",
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
    "nuxt-security",
    "dayjs-nuxt",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "@primevue/nuxt-module",
    "@nuxtjs/tailwindcss",
  ],

  css: ["~/assets/styles.scss"],

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
    defaultTimezone: import.meta.env.APP_TIMEZONE || "UTC",
  },

  i18n: {
    locales: [
      { code: "en", iso: "en-US", file: "en.json", name: "English" },
      { code: "uk", iso: "uk-UA", file: "uk-UA.json", name: "Ukrainian" },
    ],
    defaultLocale: "en",
    langDir: "locales/",
    lazy: true, // Lazy-load translations
    strategy: "no_prefix", // Options: 'no_prefix', 'prefix', 'prefix_except_default'
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      alwaysRedirect: false,
      fallbackLocale: "en",
    },
  },

  typescript: {
    // strict: false,
  },
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: ".dark",
        },
      },
    },
    components: {
      exclude: ["Form", "FormField"],
    },
    directives: {
      prefix: "",
      include: "*",
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
