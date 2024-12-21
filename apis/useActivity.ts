import { useRequestApi } from '~/composables/useRequestApi'

export const useActivity = {

  showActivity: async () => {
    return await useRequestApi('/activity?year=2025&month=12', {
      method: 'GET',
      server: false,
    })
  },
}

// .env的處理被寫在useRequestApiapis/useUserApi.ts
