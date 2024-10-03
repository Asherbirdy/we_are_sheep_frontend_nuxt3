import type { FetchContext } from 'ofetch'

export default defineNuxtPlugin(() => {
  const $Fetch = $fetch.create({
    // onRequest: (context: FetchContext) => {

    // onResponse: ({ response }) => {
    //   const isJSONData = response._data.includes('{')
    //   if (isJSONData) {
    //     return JSON.parse(response._data)
    //   }
    //   return response.
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
