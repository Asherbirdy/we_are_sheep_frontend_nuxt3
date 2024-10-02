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
    label: 'main',
    to: AdminRoutes.Home,
  },
  {
    label: 'Life Bible Blog',
    to: AdminRoutes.LifeBibleBlog,
  },
]
</script>

<template>
  <div>
    <header class="flex justify-between items-center p-3">
      <div>Logo</div>
      <UButton
        icon="ion:menu"
        size="sm"
        color="primary"
        variant="ghost"
        @click="toggleMenu"
      />
    </header>
    <UModal v-model="isMenuOpen">
      <div class="p-4">
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
</template>
