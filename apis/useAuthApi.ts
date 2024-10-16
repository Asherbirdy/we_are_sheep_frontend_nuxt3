import type { AuthLoginPayload, AuthLoginResponse } from '@/types'
import { useRequestApi } from '@/composables/useRequestApi'

export const useAuthApi = {
  login: async (payload: AuthLoginPayload) => {
    return await useRequestApi<AuthLoginResponse>('/auth/login', {
      method: 'POST',
      body: payload,
      immediate: false,
      server: false,
      lazy: true,
      watch: false,
    })
  },
}
