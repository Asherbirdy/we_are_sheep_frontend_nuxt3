import type { AsyncData, UseFetchOptions } from '#app'

export const useRequestApi = <DataT, ErrorT = any>(
  url: string,
  options?: UseFetchOptions<DataT>,
) => {
  const baseUrl = useRuntimeConfig().public.apiUrl
  const fetch = useNuxtApp().$Fetch
  return useFetch<DataT, ErrorT>(`${baseUrl}${url}`, { ...options, $fetch: fetch } as any)
}
