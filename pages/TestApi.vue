<script setup lang="ts">
import { useTestApi, useUserApi } from '@/apis'

const data = ref(null)

// 解構
onMounted(async () => {
  const { data } = await useUserApi.showAllUser()
})
</script>

<template>
  <div>
    <h1>Test API</h1>
    {{ data }}
  </div>
</template>
