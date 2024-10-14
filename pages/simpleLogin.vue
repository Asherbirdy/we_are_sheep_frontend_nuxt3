<script setup lang='ts'>
import { useAuthApi } from '@/apis'

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
  console.log(data.value)
  const accessTokenCookie = useCookie('accessToken')
  const refreshTokenJWTCookie = useCookie('refreshToken')
  accessTokenCookie.value = data.value.token.accessTokenJWT
  refreshTokenJWTCookie.value = data.value.token.refreshTokenJWT
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
  </div>
</template>

<style>

</style>
