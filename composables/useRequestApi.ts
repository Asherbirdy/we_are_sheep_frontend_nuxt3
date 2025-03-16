import type { AsyncData, UseFetchOptions } from '#app'

export const useRequestApi = <DataT, ErrorT = any>(
  url: string,
  options?: UseFetchOptions<DataT>,
) => {
  const config = useRuntimeConfig()
  const baseUrl = import.meta.env.DEV ? config.public.apiUrl : `${window.location.origin}/api/v1`
  const fetch = useNuxtApp().$Fetch
  return useFetch<DataT, ErrorT>(`${baseUrl}${url}`, {
    ...options,
    $fetch: fetch,
  } as any)
}
