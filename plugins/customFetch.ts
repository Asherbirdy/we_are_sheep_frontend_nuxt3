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
    onResponseError({ response }) {
      console.error(`-\nSTATUSCODE: ${response.status}\nRESPONSE_DATA: ${response._data}\n-`)
      return Promise.reject(response)
    },
  })

  return {
    provide: {
      customFetch: $Fetch,
    },
  }
})
