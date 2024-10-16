import { CookieEnums } from '@/enums'
import type { RuntimeConfig } from '~/types'

interface RefreshTokenResponse {
  jwtAccessToken: {
    accessTokenJWT: string
    refreshTokenJWT: string
  }
}

// refresh the accessToken using the refreshToken
const refreshAccessToken = async (refreshToken: string): Promise<string | null> => {
  try {
    const config: RuntimeConfig = useRuntimeConfig()
    const data = await $fetch<RefreshTokenResponse>(`${config.public.apiUrl}/auth/refreshToken`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })

    if (data && data.jwtAccessToken) {
      const accessTokenCookie = useCookie(CookieEnums.AccessToken)
      const refreshTokenJWTCookie = useCookie(CookieEnums.RefreshToken)
      accessTokenCookie.value = data.jwtAccessToken.accessTokenJWT
      refreshTokenJWTCookie.value = data.jwtAccessToken.refreshTokenJWT
      return data.jwtAccessToken.accessTokenJWT
    }
  }
  catch (error) {
    console.error('Failed to refresh token:', error)
  }
  return null
}

const getAuthHeaders = async () => {
  const accessToken = useCookie(CookieEnums.AccessToken).value
  const refreshToken = useCookie(CookieEnums.RefreshToken).value

  // if accessToken is present, return it
  if (accessToken) {
    return { Authorization: `Bearer ${accessToken}` }
  }

  // if refreshToken is present, refresh the accessToken
  if (refreshToken) {
    const newAccessToken = await refreshAccessToken(refreshToken)
    if (newAccessToken) {
      return { Authorization: `Bearer ${newAccessToken}` }
    }
  }

  return {}
}

export default defineNuxtPlugin(() => {
  const $Fetch = $fetch.create({
    async onRequest({ options }) {
      const headers = await getAuthHeaders()
      options.headers = { ...options.headers, ...headers }
    },
    onResponseError({ response }: any) {
      let errorMessage
      switch (response.status) {
        case 400:
          errorMessage = '[ Client Error: 400 ] 客戶端錯誤，請求格式或參數有誤！'
          break
        case 401:
          errorMessage = '[ Client Error: 401 ] 身份認證未通過! 請重新登入！'
          break
        case 403:
          errorMessage = '[ Client Error: 403 ] 用戶已獲得授權，但訪問被禁止！'
          break
        case 404:
          errorMessage = '[ Client Error: 404 ] 找不到網頁 或 未知的請求！'
          break
        case 500:
          errorMessage = '[ Server Error: 500 ] 伺服器錯誤！'
          break
        case 503:
          errorMessage = '[ Server Error: 503 ] 服務器錯誤！'
          break
        default:
          errorMessage = '[ Unknown Error ] 未知錯誤！'
      }
      console.error(errorMessage, response)
      return response
    },
  })

  return {
    provide: {
      Fetch: $Fetch,
    },
  }
})
