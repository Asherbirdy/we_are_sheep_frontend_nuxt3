<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})

const colorMode = useColorMode()
onMounted(() => {
  colorMode.preference = 'light'
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
</template>
