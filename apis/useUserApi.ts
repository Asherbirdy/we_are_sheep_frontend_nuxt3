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
    return await useRequestApi('/users/getAllUsers', {
      method: 'GET',
      server: false,
      immediate: false,
      lazy: true,
    })
  },
}

// .env的處理被寫在useRequestApi
