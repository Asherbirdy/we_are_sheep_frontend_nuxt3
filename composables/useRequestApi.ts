import type { RuntimeConfig, UseRequestApiOptions } from '@/types'

export const useRequestApi = (url: string, options: UseRequestApiOptions) => {
  const config: RuntimeConfig = useRuntimeConfig()
  const apiUrl = `${config.public.apiUrl}${url}`
  const fetchOptions = { ...options, $fetch: useNuxtApp().$customFetch }
  return useFetch(apiUrl, fetchOptions)
}
