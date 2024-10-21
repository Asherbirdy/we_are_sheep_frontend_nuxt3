<script setup lang='ts'>
import type { District } from '@/types'

const props = defineProps<{
  data: District | null
}>()

const { data } = toRefs(props)
</script>

<template>
  <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
    <template #header>
      <div>adsa</div>
    </template>

    <div>{{ data }}</div>
    <template #footer>
      <div>asdas</div>
    </template>
  </UCard>
</template>
