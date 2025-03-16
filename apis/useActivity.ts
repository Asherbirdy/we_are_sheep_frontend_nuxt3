import { useRequestApi } from '~/composables/useRequestApi'

export const useActivity = {
  showActivity: async (payload: any) => {
    return await useRequestApi('/activity', {
      method: 'GET',
      lazy: true,
      server: false,
      params: payload,
    })
  },
  addActivity: async (payload: any, options = {}) => {
    return await useRequestApi('/activity/create', {
      method: 'POST',
      body: payload,
      lazy: true,
      server: false,
      ...options,
    })
  },
  putActivity: async (payload: any, options = {}) => {
    return await useRequestApi('/activity/edit', {
      method: 'PUT',
      body: payload,
      lazy: true,
      server: false,
      ...options,
      params: payload,
    })
  },
  deleteActivity: async (id: string) => {
    return await useRequestApi(`/activity/delete/${id}`, {
      method: 'DELETE',
      lazy: true,
      server: false,
    })
  },
}

// .env的處理被寫在useRequestApiapis/useUserApi.ts
