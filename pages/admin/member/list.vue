<script setup lang="ts">
import { useUserApi } from '@/apis'

import { reactive, ref, watch } from 'vue'
//  定義表格
const columns = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'name',
    label: '名字',
  },
  {
    key: 'title',
    label: '職稱',
  },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'role',
    label: '角色',
  },
]
//  成員明細
const people = [
  {
    id: 1,
    name: '',
    title: '',
    email: '',
    role: '',
  },
  {
    id: 2,
    name: '',
    title: '',
    email: '',
    role: '',
  },
  {
    id: 3,
    name: '',
    title: '',
    email: '',
    role: '',
  },
  {
    id: 4,
    name: '',
    title: '',
    email: '',
    role: '',
  },
  {
    id: 5,
    name: '',
    title: '',
    email: '',
    role: '',
  },
  {
    id: 6,
    name: '',
    title: '',
    email: '',
    role: '',
  },
]

// 表單搜尋功能
const q = ref('')
const filteredRows = computed(() => {
  if (!q.value) {
    return people
  }
  return people.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

// 打API 取得會員列表
// 定義響應式數據
const data = ref(null)

// 打API 取得會員列表
const fetchData = async () => {
  try {
    const response = await useUserApi.showAllUser()
    console.log('原始響應:', response) // 打印原始響應

    // 解包 data
    const usersData = response.data ? response.data.value : null

    if (usersData && usersData.users) {
      users.value = usersData.users // 從 usersData 中獲取 users 陣列
      console.log('獲取的用戶數據:', users.value) // 確保這裡打印的是正確的用戶數據
    }
    else {
      console.error('響應中沒有用戶數據:', usersData)
    }
  }
  catch (error) {
    console.error('API 調用失敗:', error)
  }
}

fetchData()
</script>

<template>
  <div class="w-full  my-10">
    <h1 class="text-xl">
      會員列表111
    </h1>
    <!-- 會員列表的內容 -->
    <ul>
      <li
        v-for="user in users"
        :key="user._id"
      >
        <strong>{{ user.name }}</strong> - {{ user.email }} ({{ user.isBlocked ? '已封鎖' : '正常' }})
      </li>
    </ul>
    <div>
      <div
        class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700"
      >
        <UInput
          v-model="q"
          placeholder="Filter people..."
        />
      </div>

      <UTable
        :rows="filteredRows"
        :columns="columns"
      />
    </div>
  </div>
</template>

<style></style>
