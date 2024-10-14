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
    onRequest: (context: FetchContext | any) => {
      let accessToken = useCookie('accessToken').value
      const refreshToken = useCookie('refreshToken').value

      if (!accessToken && refreshToken) {
        refreshAccessToken(refreshToken)
        accessToken = useCookie('accessToken').value
      }

      if (accessToken) {
        context.options.headers = context.options.headers || {}
        context.options.headers.Authorization = `Bearer ${accessToken}`
      }
    },
    // onResponse: ({ response }) => {

    // },
    onResponseError({ response }) {
      console.error(`-\nSTATUSCODE: ${response.status}\nRESPONSE_DATA: ${response._data}\n-`)
      // console.log(errorMessage, response)
      return Promise.reject(response)
    },
  })

  return {
    provide: {
      customFetch: $Fetch,
    },
  }
})
