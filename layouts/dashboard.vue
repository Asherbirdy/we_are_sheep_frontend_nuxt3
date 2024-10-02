<script lang="ts" setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
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
      <ul class="p-4 bg-white">
        <li><a href="#">Menu Item 1</a></li>
        <li><a href="#">Menu Item 2</a></li>
        <li><a href="#">Menu Item 3</a></li>
      </ul>
    </nav>
    <slot />
    <header>Footer</header>
  </div>
</template>
