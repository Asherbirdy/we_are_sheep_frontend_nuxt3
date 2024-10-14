import { useRequestApi } from '~/composables/useRequestApi'

export const useAuthApi = {
  login: async (payload: { email: string, password: string }) => {
    return await useRequestApi('/auth/login', {
      method: 'POST',
      body: payload,
      immediate: false,
      server: false,
      lazy: false,
    })
  },
}
