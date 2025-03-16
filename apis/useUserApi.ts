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
  showAllUser: async () => {
    return useRequestApi('/users/getAllUsers', {
      method: 'GET',
      server: false,

    })
  },
  showMe: async () => {
    return useRequestApi('/users/showMe', {
      method: 'GET',
      server: false,
    })
  },
}
