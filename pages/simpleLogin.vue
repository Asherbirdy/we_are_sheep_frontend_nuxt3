<script setup lang='ts'>
const state = ref({
  email: '',
  password: '',
})

const handleSubmit = () => {
  console.log(state.value)
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
