<script setup lang="ts">
import { useTestApi } from '@/apis'

// 解構
const { data } = await useTestApi.getAll()
</script>

<template>
  <div>
    <h1>Test API</h1>
    {{ data }}
  </div>
</template>
