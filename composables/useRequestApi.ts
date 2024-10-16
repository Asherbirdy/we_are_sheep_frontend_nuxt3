import type { UseFetchOptions } from '#app'

export const useRequestApi = <T>(url: string, options?: UseFetchOptions<T>) => {
  const baseUrl = useRuntimeConfig().public.apiUrl
  return useFetch(`${baseUrl}${url}`, { ...options, $fetch: useNuxtApp().$Fetch })
}
