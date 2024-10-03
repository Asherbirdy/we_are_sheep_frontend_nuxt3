import { useRequestApi } from '~/composables/useRequestApi'

export const useDevApi = {
  get: async () => {
    return await useRequestApi('/dev', {
      method: 'GET',
    })
  },
}
