<script lang="ts" setup></script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-gray-100 p-4">
      Header
    </header>
    <main class="flex-grow">
      <slot />
    </main>
    <nav class="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <div class="grid grid-cols-3 h-16">
        <div class="flex items-center justify-center border-r border-gray-200">
          <span class="text-gray-600">生命讀經</span>
        </div>
        <div class="flex items-center justify-center border-r border-gray-200">
          <span class="text-gray-600">近期活動</span>
        </div>
        <div class="flex items-center justify-center">
          <span class="text-gray-600">會員中心</span>
        </div>
      </div>
    </nav>
    <footer class="bg-gray-100 p-4 mt-16">
      Footer
    </footer>
  </div>
</template>

<style scoped></style>
