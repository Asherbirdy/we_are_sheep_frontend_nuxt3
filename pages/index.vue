<script setup lang="ts">
import { useDevApi } from '~/apis'

const { data } = await useDevApi.get()
</script>

<template>
  <div>
    <h1>首頁</h1>
    <div>{{ data }}</div>
  </div>
</template>
