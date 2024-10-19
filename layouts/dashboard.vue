<script lang="ts" setup>
import { AdminRoutes } from '@/enums'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const links = [
  {
    label: '個人中心',
    to: AdminRoutes.Home,
  },
  {
    label: '會員管理',
    to: AdminRoutes.Member,
  },
]
</script>

<template>
  <div class="flex">
    <nav class="w-1/4 p-4 h-screen hidden md:block">
      <h1 class="">
        LOGO
      </h1>
      <UVerticalNavigation
        :links="links"
        @click="closeMenu"
      >
        <template #default="{ link }">
          <span class="group-hover:text-primary relative">{{ link.label }}</span>
        </template>
      </UVerticalNavigation>
    </nav>
    <div class="flex-1">
      <header class="flex justify-between items-center p-3">
        <div class="md:hidden block">
          Logo
        </div>
        <UButton
          class="md:hidden block"
          icon="ion:menu"
          size="sm"
          color="primary"
          square
          variant="ghost"
          @click="toggleMenu"
        />
      </header>
      <UModal v-model="isMenuOpen">
        <div class="p-4">
          <h1>LOGO</h1>
          <UVerticalNavigation
            :links="links"
            @click="closeMenu"
          >
            <template #default="{ link }">
              <span class="group-hover:text-primary relative">{{ link.label }}</span>
            </template>
          </UVerticalNavigation>
          <Placeholder class="h-48" />
        </div>
      </UModal>
      <UContainer>
        <slot />
      </UContainer>
    </div>
  </div>
</template>
