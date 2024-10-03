import { useRequestApi } from '~/composables/useRequestApi'

export const useMockApi = {
  getImage: async () => {
    return await useRequestApi('/mock/getImage', {
      method: 'GET',
      lazy: true,
    })
  },
}
