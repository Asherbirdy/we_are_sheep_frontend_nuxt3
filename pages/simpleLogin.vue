<script setup lang='ts'>
import { useAuthApi } from '@/apis'

const state = ref({
  email: 'dev@gmail.com',
  password: 'password',
})

const handleSubmit = async () => {
  const res = await useAuthApi.login(state.value)
  console.log(res)
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
      @click="handleSubmit"
    >
      login
    </button>
  </div>
</template>

<style>

</style>
