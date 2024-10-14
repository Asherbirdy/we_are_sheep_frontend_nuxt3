<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
  <div>
    <UButton 
      label="Open" 
      @click="isOpen = true" 
    />

    <UModal v-model="isOpen">
      <div class="p-4">
        <Placeholder class="h-48" />
      </div>
    </UModal>
  </div>
</template>
