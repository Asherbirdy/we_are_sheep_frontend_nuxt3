<script lang="ts" setup>
import { AdminRoutes, PublicRoutes } from '@/enums'

const routes = [
  {
    label: '生命讀經',
    to: PublicRoutes.Home,
  },
  {
    label: '近期活動',
    to: PublicRoutes.News,
  },
  {
    label: '會員中心',
    to: AdminRoutes.Home,
  },
]
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-gray-100 p-4 flex justify-between">
      <div>
        LOGO
      </div>
      <div class="md:block hidden">
        <nav class="flex space-x-4">
          <NuxtLink
            v-for="route in routes"
            :key="route.to"
            :to="route.to"
            class="text-gray-600"
          >
            {{ route.label }}
          </NuxtLink>
        </nav>
      </div>
    </header>
    <main class="flex-grow">
      <slot />
    </main>
    <nav class="md:hidden block fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <div class="grid grid-cols-3 h-16">
        <div
          v-for="route in routes"
          :key="route.to"
          class="flex items-center justify-center border-r border-gray-200 last:border-r-0"
        >
          <NuxtLink
            :to="route.to"
            class="text-gray-600"
          >
            {{ route.label }}
          </NuxtLink>
        </div>
      </div>
    </nav>
    <footer class="bg-gray-100 p-4 mt-16">
      Footer
    </footer>
  </div>
</template>

<style scoped></style>
