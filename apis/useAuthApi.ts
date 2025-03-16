import { useRequestApi } from '~/composables/useRequestApi'

export const useAuthApi = {
  login: async (state: any) => {
    // console.log('stts', state)
    return await useRequestApi('/auth/login', {

      method: 'POST',
      body: state,
      server: false,
      lazy: true,
      immediate: false, // 阻止立即發出請求
      watch: false, // 監聽一組響應式來源，並在它們發生變化時自動刷新所獲得的結果。
    })
  },
  register: async (state: any) => {
    return await useRequestApi('/auth/userRegister', {
      method: 'POST',
      body: state,
      server: false,
      lazy: true,
      immediate: false,
      watch: false,
    })
  },
  // 存會員登入狀態
  useStatus: async () => {
    return await useRequestApi('/users/showMe', {
      method: 'GET',
      server: false,
      lazy: true,
      watch: false,
    })
  },
}
