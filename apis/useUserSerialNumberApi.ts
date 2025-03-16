import type { UserSerialNumberResponse } from '@/types'
// import { useNuxtApp } from '#app'

// const nuxtApp = useNuxtApp()
export const useUserSerialNumberApi = {
  getAll: async (options = {}) => {
    return await useRequestApi<UserSerialNumberResponse>(
      '/userSerialNumber/getAll',
      {
        method: 'GET',
        server: false,
        lazy: false,
        ...options,
      },
    )
  },
  create: async (payload: any) => {
    return await useRequestApi<any>('/userSerialNumber/create', {
      method: 'POST',
      body: payload,
      watch: false,
      immediate: false,
    })
  },
}
