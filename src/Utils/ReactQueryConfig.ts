import { QueryClient } from "react-query";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import { onError } from "./Helpers";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24,
      onError: onError,
      retry: false,
    },
    mutations: {
      onError: onError,
      retry: false,
    },
  },
});
if (typeof window !== 'undefined') {
  const localStoragePeristor = createWebStoragePersistor({
    storage: window.localStorage,
  });

  persistQueryClient({
    queryClient,
    persistor: localStoragePeristor,
  });
}