<script setup lang="ts">
import { useActivity } from "@/apis";
import { useMemberStore } from "@/store/UserStatus";
import { idText } from "typescript";
import type { Form, FormSubmitEvent } from '#ui/types'

import { computed, onMounted, reactive, ref, watch } from "vue";

// 1. 獲取數據

interface Schema {
  selectedYear: string
  selectedMonth: string
}

const form = ref<Form<Schema>>()


const state = reactive<Schema>({
  selectedYear: "2024",
  selectedMonth: "12",
})

const activityList = ref([])

const fetchData = async (payload: any) => {
  const { data: activityData } = await useActivity.showActivity({
    year: payload.selectedYear,
    month: payload.selectedMonth,
  })
  activityList.value = activityData.value?.data || []
}

fetchData(state) // 進入頁面打api

const onSearch = () => {
  fetchData(state) // 搜尋
}


const columnsYear = [
  {
    value: "2024",
    label: "2024年",
  },
  {
    value: "2025",
    label: "2025年",
  },
];
const columnsMonth = [
  {
    value: "1",
    label: "1月",
  },
  {
    value: "2",
    label: "2月",
  },
  {
    value: "3",
    label: "3月",
  },
  {
    value: "4",
    label: "4月",
  },
  {
    value: "5",
    label: "5月",
  },
  {
    value: "6",
    label: "6月",
  },
  {
    value: "7",
    label: "7月",
  },
  {
    value: "8",
    label: "8月",
  },
  {
    value: "9",
    label: "9月",
  },
  {
    value: "10",
    label: "10月",
  },
  {
    value: "11",
    label: "11月",
  },
  {
    value: "12",
    label: "12月",
  },
];

const onChangeMonth = (v: any) => {
  state.selectedMonth = v.value // month的下拉選單會拿到object { label: '1月', value: '1' }
}

const onChangeYear = (v: any) => {
  state.selectedYear = v.value
}

</script>

<template>
  <div>
    <div class="flex px-3 gap-2 py-3.5 border-b border-gray-200">
      <UForm ref="form" :state="state">
        <div class="flex gap-2 align-end">
          <UFormGroup label="年" name="selectedYear">
            <USelectMenu v-model="state.selectedYear" :options="columnsYear" placeholder="年" class="w-20" @change="onChangeYear" />
          </UFormGroup>
          <UFormGroup label="月" name="selectedMonth">
            <USelectMenu v-model="state.selectedMonth" :options="columnsMonth" placeholder="月" class="w-20" @change="onChangeMonth" />
          </UFormGroup>
          <UButton @click="onSearch">查詢</UButton>
        </div>
      </UForm>
    </div>

    <UTable :rows="activityList" />
    <UButton label="新增活動" />
    <UButton label="刪除活動" />
  </div>
</template>

<style></style>
