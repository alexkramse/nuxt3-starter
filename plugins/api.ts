export default defineNuxtPlugin({
  setup: function () {
    const { token } = useAuth();
    const _token = token.value && !token.value.startsWith("Bearer ") ? `Bearer ${token.value}` : token.value;
    const controllers: Record<string, AbortController> = {}; // Track controllers for different requests
    const normalizeUrl = (url: string | RequestInfo) => String(url).replace(/[\\/?&=:#\s]+/g, "-");

    const api = $fetch.create({
      baseURL: useRuntimeConfig().public.apiBase,
      headers: {
        Authorization: _token || token.value || "",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      onRequest: ({ request, options }) => {
        if (_token) {
          options.headers.set("Authorization", _token);
        }

        const tag = normalizeUrl(request);
        const shouldAbort = (options as { shouldAbort?: boolean })?.shouldAbort == true;
        if (shouldAbort) {
          if (controllers[tag]) controllers[tag].abort();
          controllers[tag] = new AbortController();
          options.signal = controllers[tag].signal;
        }
      },
      onResponse: () => {
        // stop global loading
      },
      onRequestError: ({ response }) => {
        // Handle authentication errors
        if (response?.status === 401) {
          // await nuxtApp.runWithContext(() => navigateTo('/login'))
        }
      },
    });

    return {
      provide: {
        api,
        cancelRequest: (url: string | RequestInfo) => {
          const tag = normalizeUrl(url);
          if (controllers[tag]) controllers[tag].abort();
        },
      },
    };
  },
});
