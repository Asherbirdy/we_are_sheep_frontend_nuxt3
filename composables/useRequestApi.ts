import type { UseFetchOptions } from 'nuxt/app'

export function useRequestApi(
  url: string | (() => string),
  options: any,
) {
  const apiUrl = `https://enootebook-server.onrender.com/api/v1${url}`
  const config = {
    ...options,
    $fetch: useNuxtApp().$customFetch,
  }
  return useFetch(apiUrl, config)
}
