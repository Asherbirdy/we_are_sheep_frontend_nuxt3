<script setup lang='ts'>
import { useAuthApi, useUserApi } from '@/apis'

const state = ref({
  email: 'dev@gmail.com',
  password: 'password',
})

const {
  execute: handleLogin,
  data,
} = await useAuthApi.login(state.value)

const onSubmit = async () => {
  await handleLogin()
  const accessTokenCookie = useCookie('accessToken')
  const refreshTokenJWTCookie = useCookie('refreshToken')
  accessTokenCookie.value = data.value.token.accessTokenJWT
  refreshTokenJWTCookie.value = data.value.token.refreshTokenJWT
}

const {
  execute: handleShowNonBindUser,
  data: nonBindUserData,
} = await useUserApi.showNonBindUser()

const onShowNonBindUser = async () => {
  await handleShowNonBindUser()
}
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
      @click="onSubmit"
    >
      login
    </button>
    <div>----分隔線----</div>
    <button
      class="bg-blue-500 text-white p-2 rounded-md"
      @click="onShowNonBindUser"
    >
      showNonBindUser
    </button>
    <div>
      {{ nonBindUserData }}
    </div>
  </div>
</template>

<style>

</style>
