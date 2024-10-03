<script setup lang="ts">
import { useMockApi } from '~/apis'

const { data } = await useMockApi.getImage()
console.log(data.value)
</script>

<template>
  <div>
    <h1>首頁</h1>
    <div>{{ data }}</div>
  </div>
</template>
