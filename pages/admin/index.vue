<script setup lang='ts'>
import { useUserApi } from "@/apis";
// https://ui.nuxt.com/components/form

definePageMeta({
  layout: 'dashboard',
})

const user = ref(null)

const { data } = await useUserApi.showMe()
user.value = data.value?.user
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <UForm v-if="user">
      <UFormGroup label="Name">
        <UInput v-model="user.name" disabled />
      </UFormGroup>
      <UFormGroup label="Email">
        <UInput v-model="user.email" disabled />
      </UFormGroup>
      <UFormGroup label="Email Verified">
        <UToggle v-model="user.emailVerified" disabled />
        <UButton v-if="!user.emailVerified" class="ml-2">Verify</UButton>
      </UFormGroup>
      <UFormGroup label="Role">
        <UInput v-model="user.role" disabled />
      </UFormGroup>
      <UFormGroup label="District">
        <UInput v-model="user.district" disabled />
      </UFormGroup>
    </UForm>
  </div>
</template>

<style>

</style>
