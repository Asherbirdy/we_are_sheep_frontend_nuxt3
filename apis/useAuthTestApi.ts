import type { AuthLoginTestPayload, AuthLoginTestResponse } from '@/types'
import { useRequestApi } from '@/composables/useRequestApi'

export const useAuthTestApi = {
  login: async (payload: AuthLoginTestPayload) => {   //  ctrl 左鍵   
    return await useRequestApi<AuthLoginTestResponse>('/auth/login', {
      method: 'POST',
      body: payload,
      immediate: false,
      server: false,
      lazy: true,
      watch: false,
    })
  },
}
