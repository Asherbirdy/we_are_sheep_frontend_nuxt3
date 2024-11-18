<script setup lang='ts'>
import { AdminRoutes } from '~/enums'

definePageMeta({
  layout: 'dashboard',
})

const links = [{
  label: '會員列表',
  to: AdminRoutes.MemberList,
}, {
  label: '序號',
  to: AdminRoutes.MemberSerial,
}, {
  label: '區',
  to: AdminRoutes.MemberDistrict,
}]
</script>

<template>
  <div>
    <UHorizontalNavigation :links="links">
      <template #default="{ link }">
        <span class="group-hover:text-primary relative">
          {{ link.label }}
        </span>
      </template>
    </UHorizontalNavigation>
    <NuxtPage />
    <h2>77777777</h2>
  </div>
</template>
