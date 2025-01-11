import type { AsyncData, UseFetchOptions } from '#app'

export const useRequestApi = <DataT, ErrorT = any>(
  url: string,
  options?: UseFetchOptions<DataT>,
) => {
  const config = useRuntimeConfig()
  const baseUrl = import.meta.env.DEV ? config.public.apiUrl : `${window.location.origin}/api/v1`
  // 有處理.env
  const fetch = useNuxtApp().$Fetch
  // baseUrl = http://84.10.7777.40:XXX/api/v9
  // URL = /auth/login
  return useFetch<DataT, ErrorT>(`${baseUrl}${url}`, {
    ...options,
    $fetch: fetch,
  } as any)
}
