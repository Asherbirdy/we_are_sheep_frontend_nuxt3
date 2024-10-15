<script setup lang='ts'>
import { useAuthApi, useUserApi } from '@/apis'
import { CookieEnums } from '@/enums'

const config = useRuntimeConfig()
const state = ref({
  email: config.public.email,
  password: config.public.password,
})

const {
  execute: handleLogin,
  data: loginResponse,
} = await useAuthApi.login(state.value)

const onLogin = async () => {
  await handleLogin()
  const accessTokenCookie = useCookie(CookieEnums.AccessToken)
  const refreshTokenJWTCookie = useCookie(CookieEnums.RefreshToken)
  accessTokenCookie.value = loginResponse.value.token.accessTokenJWT
  refreshTokenJWTCookie.value = loginResponse.value.token.refreshTokenJWT
}

const {
  execute: handleShowNonBindUser,
  data: nonBindUserData,
} = await useUserApi.showNonBindUser()
</script>

<template>
  <div>
    <p>email</p>
    <input
      v-model="state.email"
      class="border border-gray-300 p-2 rounded-md"
      type="text"
    >
    <p>password</p>
    <input
      v-model="state.password"
      class="border border-gray-300 p-2 rounded-md"
      type="password"
    >
    <button
      class="bg-blue-500 text-white p-2 rounded-md"
      @click="onLogin"
    >
      login
    </button>
    <div>----分隔線----</div>
    <button
      class="bg-blue-500 text-white p-2 rounded-md"
      @click="handleShowNonBindUser()"
    >
      showNonBindUser
    </button>
    <div>
      {{ nonBindUserData }}
    </div>
  </div>
</template>
