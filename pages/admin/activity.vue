<script setup lang="ts">
import type { Form, FormSubmitEvent } from '#ui/types'
import { useDayjs } from '#dayjs'
import { useActivity } from '@/apis'
import { useMemberStore } from '@/store/UserStatus'
import { idText } from 'typescript'

import { computed, onMounted, reactive, ref, watch } from 'vue'

definePageMeta({
  layout: 'dashboard',
})

const dayjs = useDayjs()

const yearsOptions = Array.from({ length: 51 }, (_, i) => ({ label: `${2024 + i}年`, value: `${2024 + i}` })) // 2024~2074
const monthsOptions = Array.from({ length: 12 }, (_, i) => ({ label: `${i + 1}月`, value: `${i + 1}` }))
const daysOptions = Array.from({ length: 31 }, (_, i) => ({ label: `${i + 1}日`, value: `${i + 1}` }))

// 1. 獲取數據

interface Schema {
  selectedYear: string
  selectedMonth: string
}

const form = ref<Form<Schema>>()

const state = reactive<Schema>({
  selectedYear: yearsOptions[0].value,
  selectedMonth: monthsOptions[0].value,
})

const columns = ref([
  { key: 'date', label: '日期' },
  { key: 'title', label: '標題' },
  { key: 'content', label: '內容' },
  { key: 'createdAt', label: '建立日期' },
  { key: 'actions' },
])
const activityList = ref([])

const fetchData = async (payload: any) => {
  const { data: activityData } = await useActivity.showActivity({
    year: payload.selectedYear, // 詢問為何是payload
    month: payload.selectedMonth,
  })
  activityList.value = activityData.value?.data || []
}

fetchData(state) // 進入頁面打api

const onSearch = () => {
  fetchData(state) // 搜尋
}

const onChangeMonth = (v: any) => {
  state.selectedMonth = v.value // month的下拉選單會拿到object { label: '1月', value: '1' }
}

const onChangeYear = (v: any) => {
  state.selectedYear = v.value
}

const isOpen = ref(false)
const modalType = ref<'create' | 'edit'>('create')
// ------------------------------------------------
// POST新增表單

interface createStateType {
  id?: string
  selectedYear: string
  selectedMonth: string
  selectedDay: string
  selectTime: string
  FormTitle: string
  FormContent: string
}

const createState = reactive<createStateType>({
  id: '',
  selectedYear: yearsOptions[0].value,
  selectedMonth: monthsOptions[0].value,
  selectedDay: daysOptions[0].value,
  selectTime: '',
  FormTitle: '',
  FormContent: '',
})

const onChangeCreateYear = (v: any) => {
  createState.selectedYear = v.value
}

const onChangeCreateMonth = (v: any) => {
  createState.selectedMonth = v.value
}

const onChangeCreateDay = (v: any) => {
  createState.selectedDay = v.value
}

const resetCreateState = () => {
  createState.id = ''
  createState.selectedYear = yearsOptions[0].value
  createState.selectedMonth = monthsOptions[0].value
  createState.selectedDay = daysOptions[0].value
  createState.selectTime = ''
  createState.FormTitle = ''
  createState.FormContent = ''
}

async function sendForm() {
  let payload: any = {
    activityId: createState.id,
    title: createState.FormTitle,
    content: createState.FormContent,
  }
  if (modalType.value === 'create') {
    payload = {
      ...payload,
      year: Number.parseInt(createState.selectedYear, 10),
      month: String(Number.parseInt(createState.selectedMonth, 10)).padStart(2, 0),
      day: String(Number.parseInt(createState.selectedDay, 10)).padStart(2, 0),
      time: createState.selectTime,
    }
  }
  const fetchApi = modalType.value === 'create' ? useActivity.addActivity : useActivity.putActivity // 修改活動
  await fetchApi(payload).then(() => {
    isOpen.value = false
    resetCreateState()
    fetchData(state)
  }).catch((error) => {
    throw new Error(error)
  })
  // if (modalType.value === "create") {
  //   await useActivity.addActivity(payload)
  // } else {
  //   await useActivity.putActivity(payload)
  // }
}

const onEdit = (record: any) => {
  isOpen.value = true
  modalType.value = 'edit'
  const date = dayjs(record.date)
  createState.id = record._id
  createState.selectedYear = record.year
  createState.selectedMonth = record.month
  createState.selectedDay = date.format('DD')
  createState.selectTime = date.format('HH:mm')
  createState.FormTitle = record.title
  createState.FormContent = record.content
}

const onCreate = () => {
  resetCreateState()
  isOpen.value = true
  modalType.value = 'create'
}

// 刪除活動
const onDelete = (id: string) => {
  useActivity.deleteActivity(id).then(() => {
    fetchData(state)
  }).catch((error) => {
    throw new Error(error)
  })
}
</script>

<template>
  <div>
    <div class="flex px-3 gap-2 py-3.5 border-b border-gray-200">
      <UForm
        ref="form"
        :state="state"
      >
        <div class="flex gap-2 align-end">
          <UFormGroup
            label="年"
            name="selectedYear"
          >
            <USelectMenu
              v-model="state.selectedYear"
              :options="yearsOptions"
              placeholder="年"
              class="w-20"
              @change="onChangeYear"
            />
          </UFormGroup>
          <UFormGroup
            label="月"
            name="selectedMonth"
          >
            <USelectMenu
              v-model="state.selectedMonth"
              :options="monthsOptions"
              placeholder="月"
              class="w-20"
              @change="onChangeMonth"
            />
          </UFormGroup>
          <UButton @click="onSearch">
            查詢
          </UButton>
          <UButton
            label="新增活動"
            @click="onCreate"
          />
        </div>
      </UForm>
    </div>

    <UTable
      :rows="activityList"
      :columns="columns"
    >
      <template #actions-data="{ row }">
        <UButton
          label="編輯"
          class="mr-2"
          @click="onEdit(row)"
        />
        <UButton
          label="刪除"
          @click="onDelete(row._id)"
        />
      </template>
    </UTable>
    <!-- <UButton label="新增活動" /> -->
    <UModal
      v-model="isOpen"
      prevent-close
    >
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              {{ modalType === "create"
                ? "新增活動" : "編輯活動" }}
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>

        <!-- <Placeholder class="h-32" /> -->
        <!-- 表單填寫 -->
        <div class="max-w-lg mx-auto space-y-6 p-8 bg-white rounded-lg shadow-lg">
          <div class="text-2xl font-semibold text-gray-800 text-center">
            活動資訊輸入
          </div>

          <div class="space-y-4">
            <!-- 年份 -->
            <div>
              <label
                for="year"
                class="block text-sm font-medium text-gray-700"
              >年份</label>
              <UInputMenu
                v-model="createState.selectedYear"
                :options="yearsOptions"
                :disabled="modalType === 'edit'"
                @change="onChangeCreateYear"
              />
            </div>

            <!-- 月份 -->
            <div>
              <label
                for="month"
                class="block text-sm font-medium text-gray-700"
              >月份</label>
              <UInputMenu
                v-model="createState.selectedMonth"
                :options="monthsOptions"
                :disabled="modalType === 'edit'"
                @change="onChangeCreateMonth"
              />
            </div>

            <!-- 日期 -->
            <div>
              <label
                for="day"
                class="block text-sm font-medium text-gray-700"
              >日期</label>
              <UInputMenu
                v-model="createState.selectedDay"
                :options="daysOptions"
                :disabled="modalType === 'edit'"
                @change="onChangeCreateDay"
              />
            </div>

            <!-- 時間 -->
            <div>
              <label
                for="time"
                class="block text-sm font-medium text-gray-700"
              >時間</label>
              <input
                id="time"
                v-model="createState.selectTime"
                type="time"
                class="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                :disabled="modalType === 'edit'"
              >
            </div>

            <!-- 標題 -->
            <div>
              <label
                for="title"
                class="block text-sm font-medium text-gray-700"
              >標題</label>
              <input
                id="title"
                v-model="createState.FormTitle"
                type="text"
                class="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                placeholder="請輸入標題"
              >
            </div>

            <!-- 內容 -->
            <div>
              <label
                for="content"
                class="block text-sm font-medium text-gray-700"
              >內容</label>
              <textarea
                id="content"
                v-model="createState.FormContent"
                rows="4"
                class="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                placeholder="請輸入內容"
              />
            </div>
          </div>

          <div class="flex justify-center">
            <button
              type="button"
              class="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              @click="sendForm"
            >
              提交
            </button>
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<style>
.space-y-6 > * + * {
  margin-top: 1.5rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}
</style>
