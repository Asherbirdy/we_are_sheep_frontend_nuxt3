<script setup lang="ts">
import { useHomeStore } from '@/store/Home'

const store = useHomeStore()
</script>

<template>
  <div>
    <h1>首頁:{{ store.count }}</h1>
    <button @click="store.add">
      click
    </button>
  </div>
</template>

<style></style>
