import { useRequestApi } from '~/composables/useRequestApi'

export const useActivity = {

  showActivity: async (payload: any) => {
    return await useRequestApi('/activity', {
      method: 'GET',
      server: false,
      params: payload,
    })
  },
}

// .env的處理被寫在useRequestApiapis/useUserApi.ts
