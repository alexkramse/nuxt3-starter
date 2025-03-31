// import type { User } from "~/types/user"

export const userRepository = <T>() => {
  const { $api } = useNuxtApp();

  return {
    async get(): Promise<T> {
      return $api("/me");
    },
  };
};
