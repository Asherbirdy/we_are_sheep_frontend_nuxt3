import type { UseFetchOptions } from '#app'
import type { RuntimeConfig } from '@/types'

export const useRequestApi = (url: string, options?: UseFetchOptions<any>) => {
  const baseUrl = useRuntimeConfig().public.apiUrl
  return useFetch(`${baseUrl}${url}`, { ...options, $fetch: useNuxtApp().$customFetch })
}
