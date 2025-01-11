import type { AsyncData, UseFetchOptions } from '#app'

export const useRequestApi = <DataT, ErrorT = any>(
  url: string,
  options?: UseFetchOptions<DataT>,
) => {
  const baseUrl = useRuntimeConfig().public.apiUrl
  // 有處理.env
  const fetch = useNuxtApp().$Fetch
  // baseUrl = http://84.10.7777.40:XXX/api/v9
  // URL = /auth/login
  return useFetch<DataT, ErrorT>(`${baseUrl}${url}`, {
    ...options,
    $fetch: fetch,
  } as any)
}
