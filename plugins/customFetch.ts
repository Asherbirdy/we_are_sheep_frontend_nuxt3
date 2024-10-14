import type { FetchContext } from 'ofetch'

interface RefreshTokenResponse {
  jwtAccessToken: {
    accessTokenJWT: string
    refreshTokenJWT: string
  }
}

const refreshAccessToken = async (refreshToken: string) => {
  const { data } = await useFetch<RefreshTokenResponse>(`${useRuntimeConfig().public.baseURL}/auth/refreshToken`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  })

  if (data.value && data.value.jwtAccessToken) {
    const accessTokenCookie = useCookie('accessToken')
    accessTokenCookie.value = data.value.jwtAccessToken.accessTokenJWT
    const refreshTokenJWTCookie = useCookie('refreshToken')
    refreshTokenJWTCookie.value = data.value.jwtAccessToken.refreshTokenJWT
  }
}
export default defineNuxtPlugin(() => {
  const $Fetch = $fetch.create({
    onRequest: async (context: FetchContext | any) => {

    },
    onResponseError({ response }) {
      console.error(`-\nSTATUSCODE: ${response.status}\nRESPONSE_DATA: ${response._data}\n-`)
      return Promise.reject(response)
    },
    onResponse({ response }: any) {
      // console.log(response)
      return response
    },
  })

  return {
    provide: {
      customFetch: $Fetch,
    },
  }
})
