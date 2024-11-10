import { useRequestApi } from '@/composables/useRequestApi'

export const useTestApi = {
  getAll: async () => { // 命名方式
    return await useRequestApi('/dev', {
      method: 'GET',
    })
  },
  test: '',
}
