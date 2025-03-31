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
      enabled: false,
    },
  },
  $production: {
    ssr: true,
  },

  runtimeConfig: {
    apiURL: import.meta.env.API_URL || "http://localhost:8000",
    public: {
      apiBase: import.meta.env.API_URL,
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
    "@sidebase/nuxt-auth",
  ],

  css: ["~/assets/styles.scss"],

  app: {
    head: {
      title: "Home",
      titleTemplate: "%s | Nuxt3 Starter",
      meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  security: {
    enabled: false,
    headers: {
      crossOriginEmbedderPolicy: "unsafe-none",
      crossOriginOpenerPolicy: "same-origin-allow-popups",
      contentSecurityPolicy: {
        "img-src": ["'self'", "data:", "https://*", import.meta.env.APP_URL || "http://127.0.0.1:8000"],
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
      exclude: [],
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

  auth: {
    // isEnabled: true,
    // disableServerSideAuth: false,
    originEnvKey: "NUXT_API_URL",
    // baseURL: "http://test.com",
    provider: {
      type: "local",
      endpoints: {
        signIn: { path: "/auth/login", method: "post" },
        signOut: { path: "/logout", method: "post" },
        signUp: { path: "/register", method: "post" },
        getSession: { path: "/me", method: "get" },
      },
      token: {
        signInResponseTokenPointer: "/data/token",
        type: "Bearer",
        cookieName: "auth.token",
        headerName: "Authorization",
        maxAgeInSeconds: 3 * 30 * 24 * 60 * 60, // 3 months
        // sameSiteAttribute: "lax",
        // cookieDomain: "",
        // secureCookieAttribute: false,
        // httpOnlyCookieAttribute: true,
      },
    },
    // sessionRefresh: {
    //   enablePeriodically: true,
    //   enableOnWindowFocus: true,
    // },
  },
});
