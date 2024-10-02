<script lang="ts" setup>
import { ref } from 'vue'
import { AdminRoutes } from '~/enums'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
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
        square
        variant="ghost"
        @click="toggleMenu"
      />
    </header>
    <div
      v-if="isMenuOpen"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 z-10"
      @click="toggleMenu"
    />
    <nav
      class="fixed top-0 right-0 h-full bg-white transform transition-transform z-20"
      :class="[isMenuOpen ? 'translate-x-0 w-9/12' : 'translate-x-full']"
    >
      <UVerticalNavigation :links="links">
        <template #default="{ link }">
          <span class="group-hover:text-primary relative">{{ link.label }}</span>
        </template>
      </UVerticalNavigation>
    </nav>
    <UContainer>
      <slot />
    </UContainer>
    <header>Footer</header>
  </div>
</template>
