<script setup lang='ts'>
import { useAuthTestApi, useUserApi } from '@/apis'
import { AdminRoutes, CookieEnums } from '@/enums'

const config = useRuntimeConfig()
const state = ref({
  email: config.public.email || '',
  password: config.public.password || '',
})

const {
  execute: handleLogin, //  自己命名
  data: loginResponse,
  error: loginError,
  status: loginStatus,
} = await useAuthTestApi.login(state.value) // 取得 INPUT 表單資料

const onLogin = async () => { //    執行API函式
  await handleLogin()
  if (loginError.value) {
    // eslint-disable-next-line no-alert
    alert(loginError.value.data.msg)
    return
  }
  const accessTokenCookie = useCookie(CookieEnums.AccessToken)
  const refreshTokenJWTCookie = useCookie(CookieEnums.RefreshToken)
  if (loginResponse.value) {
    accessTokenCookie.value = loginResponse.value.token.accessTokenJWT
    refreshTokenJWTCookie.value = loginResponse.value.token.refreshTokenJWT
    navigateTo(AdminRoutes.Home)
  }
}

const {
  execute: handleShowNonBindUser,
  data: nonBindUserResponse,
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
    <UButton
      class="bg-blue-500 text-white p-2 rounded-md"
      :loading="loginStatus === 'pending'"
      @click="onLogin"
    >
      login
    </UButton>
    <div>----分隔線----</div>
    <button
      class="bg-blue-500 text-white p-2 rounded-md"
      @click="handleShowNonBindUser()"
    >
      showNonBindUser
    </button>
    <div>
      {{ nonBindUserResponse }}
    </div>
  </div>
</template>
