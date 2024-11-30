<script setup lang="ts">
import { AdminRoutes } from "~/enums";

//  table  個人帳號資料
import { useUserApi } from '~/apis'

//  table  個人帳號資料

// const people = [{
//   role: '99',
//   id: '',
//   district: '',
//   name: '',
//   email: '',
//   emailVerified: '',
// }]

// const PeopleData = ref(null)

// 假設你已經獲取了 API 資料
// 假設 useUserApi 是已經定義好的 API 函數
import { ref } from 'vue'

definePageMeta({
  layout: "dashboard",
});

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

const { data } = await useUserApi.showMe()

console.log(data)

// 調用函數以獲取用戶資料

// 使用明確的型別
// const people = [{
//   role: data.value.user.role, // 從 API 資料中獲取 role
//   id: data.value.user._id, // 從 API 資料中獲取 id
//   district: data.value.user.district, // 從 API 資料中獲取 district
//   name: data.value.user.name, // 從 API 資料中獲取 name
//   email: data.value.user.email, // 從 API 資料中獲取 email
//   emailVerified: data.value.user.emailVerified ? '是' : '否', // 將布林值轉換為字符串
// }]
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

    <UTable :rows="people" />
  </div>
</template>
