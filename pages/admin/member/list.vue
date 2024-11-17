<script setup lang="ts">
import { useUserApi } from '@/apis'
import { idText } from 'typescript'

import { computed, reactive, ref, watch } from 'vue'
//  定義表格
const columns = [
  {
    key: '_id',
    label: 'ID',
  },
  {
    key: 'name',
    label: '名字',
  },
  // {
  //   key: 'title',
  //   label: '職稱',
  // },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'role',
    label: '角色',
  },
]
// const people6 = ref([])

//  成員明細

const PeopleData = ref([])

// 表單搜尋功能
const q = ref('')
const filteredRows = computed(() => {
  if (!q.value) {
    return PeopleData.value
  }
  return PeopleData.value.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

// 打API 取得會員列表
// 定義響應式數據
// const data = ref(null)

// 打API 取得會員列表

// const { data } = await useUserApi.showAllUser()
// console.log('output', data.value)

// console.log('1122', typeof data.value)

const { data } = await useUserApi.showAllUser()
if (data.value) {
  PeopleData.value = data.value.users
}
</script>

<template>
  <div class="w-full  my-10">
    <h1 class="text-xl">
      會員列表
    </h1>
    <!-- 會員列表的內容 -->
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
      <!--  -->
    </div>
  </div>
</template>

<style></style>
