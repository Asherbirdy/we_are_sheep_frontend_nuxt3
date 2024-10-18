import { useRequestApi } from '~/composables/useRequestApi'

export const useUserApi = {
  showNonBindUser: async () => {
    return await useRequestApi('/users/showNonBindUser', {
      method: 'GET',
      server: false,
      immediate: false,
      lazy: true,
    })
  },
}
