<script setup lang='ts'>
const links = [{
  label: '會員列表',
  to: '/admin/member/',
}, {
  label: '序號管理',
  to: '/admin/member/serial',
}]
</script>

<template>
  <div>
    <UHorizontalNavigation :links="links">
      <template #default="{ link }">
        <span class="group-hover:text-primary relative">{{ link.label }}</span>
      </template>
    </UHorizontalNavigation>
    <NuxtChild />
  </div>
</template>

<style>

</style>
