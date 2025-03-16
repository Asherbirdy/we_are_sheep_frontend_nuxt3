import type { AuthLoginTestPayload, AuthLoginTestResponse } from '@/types'
import { useRequestApi } from '@/composables/useRequestApi'

export const useAuthTestApi = {
  login: async (payload: AuthLoginTestPayload) => {
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
