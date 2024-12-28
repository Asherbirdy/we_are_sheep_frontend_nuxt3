<script setup lang="ts">
import type { Form, FormSubmitEvent } from "#ui/types";
import { useActivity } from "@/apis";
import { useMemberStore } from "@/store/UserStatus";
import { idText } from "typescript";

import { computed, onMounted, reactive, ref, watch } from "vue";

// 1. 獲取數據

interface Schema {
  selectedYear: string;
  selectedMonth: string;
}

const form = ref<Form<Schema>>();

const state = reactive<Schema>({
  selectedYear: "2024",
  selectedMonth: "12",
});

const activityList = ref([]);

const fetchData = async (payload: any) => {
  const { data: activityData } = await useActivity.showActivity({
    year: payload.selectedYear, // 詢問為何是payload
    month: payload.selectedMonth,
  });
  activityList.value = activityData.value?.data || [];
};

fetchData(state); // 進入頁面打api

const onSearch = () => {
  fetchData(state); // 搜尋
};

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
  state.selectedMonth = v.value; // month的下拉選單會拿到object { label: '1月', value: '1' }
};

const onChangeYear = (v: any) => {
  state.selectedYear = v.value;
};

const isOpen = ref(false);
// ------------------------------------------------
// POST新增表單

const years = Array.from({ length: 51 }, (_, i) => `${2024 + i}`); // 1970 - 2020
const months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
const days = Array.from({ length: 31 }, (_, i) => `${i + 1}日`);

const selectedYear = ref(years[0]);
const selectedMonth = ref(months[0]);
const selectedDay = ref(days[0]);
const selectTime = ref("");
const FormTitle = ref("");
const FormContent = ref("");

onMounted(() => {
  console.log(selectedYear.value, selectedMonth.value, selectedDay.value);
});

// 動態監聽選中值的變化
watch(
  [selectedYear, selectedMonth, selectedDay, selectTime, FormTitle, FormContent],
  ([newYear, newMonth, newDay, newTime, newTitle, newContext]) => {
    console.log("更新後的年份:", newYear);
    console.log("更新後的月份:", newMonth);
    console.log("更新後的日期:", newDay);
    console.log("更新後的時間:", newTime);
    console.log("更新後的活動標題:", newTitle);
    console.log("更新後的內容:", newContext);
  },
);

// 使用 parseInt 解析數字，並補零處理
const newYear = Number.parseInt(selectedYear.value, 10); // 2024
const newMonth = String(Number.parseInt(selectedMonth.value, 10)).padStart(2, 0); // "01"
const newDay = String(Number.parseInt(selectedDay.value, 10)).padStart(2, 0); // "01"

// 構建活動物件（JSON 格式）
const activity = ref({
  year: newYear, // 2024
  month: newMonth, // "01"
  day: newDay, // "01"
  time: selectTime, // "12:00"
});

const CreateActivity = async () => {
  const { execute } = await useActivity.addActivity({
    year: activity.value.year,
    month: activity.value.month,
    day: activity.value.day,
    time: activity.value.time,
    title: FormTitle.value,
    content: FormContent.value,
  });

  // 假設你需要發送到後端 API
  execute();
};

async function sendForm() {
  await CreateActivity();
}
</script>

<template>
  <div>
    <div class="flex px-3 gap-2 py-3.5 border-b border-gray-200">
      <UForm ref="form" :state="state">
        <div class="flex gap-2 align-end">
          <UFormGroup label="年" name="selectedYear">
            <USelectMenu
              v-model="state.selectedYear"
              :options="columnsYear"
              placeholder="年"
              class="w-20"
              @change="onChangeYear" />
          </UFormGroup>
          <UFormGroup label="月" name="selectedMonth">
            <USelectMenu
              v-model="state.selectedMonth"
              :options="columnsMonth"
              placeholder="月"
              class="w-20"
              @change="onChangeMonth" />
          </UFormGroup>
          <UButton @click="onSearch">查詢</UButton>
        </div>
      </UForm>
    </div>

    <UTable :rows="activityList" />
    <!-- <UButton label="新增活動" /> -->
    <UButton label="刪除活動" />

    <div>
      <UButton label="新增活動" @click="isOpen = true" />

      <UModal v-model="isOpen" prevent-close>
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Modal</h3>
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-x-mark-20-solid"
                class="-my-1"
                @click="isOpen = false" />
            </div>
          </template>

          <Placeholder class="h-32" />
          <!-- 表單填寫 -->
          <div class="max-w-lg mx-auto space-y-6 p-8 bg-white rounded-lg shadow-lg">
            <div class="text-2xl font-semibold text-gray-800 text-center">活動資訊輸入</div>

            <div class="space-y-4">
              <!-- 年份 -->
              <div>
                <label for="year" class="block text-sm font-medium text-gray-700">年份</label>
                <UInputMenu v-model="selectedYear" :options="years" />
              </div>

              <!-- 月份 -->
              <div>
                <label for="month" class="block text-sm font-medium text-gray-700">月份</label>
                <UInputMenu v-model="selectedMonth" :options="months" />
              </div>

              <!-- 日期 -->
              <div>
                <label for="day" class="block text-sm font-medium text-gray-700">日期</label>
                <UInputMenu v-model="selectedDay" :options="days" />
              </div>

              <!-- 時間 -->
              <div>
                <label for="time" class="block text-sm font-medium text-gray-700">時間</label>
                <input
                  id="time"
                  v-model="selectTime"
                  type="time"
                  class="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
              </div>

              <!-- 標題 -->
              <div>
                <label for="title" class="block text-sm font-medium text-gray-700">標題</label>
                <input
                  id="title"
                  v-model="FormTitle"
                  type="text"
                  class="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  placeholder="請輸入標題" />
              </div>

              <!-- 內容 -->
              <div>
                <label for="content" class="block text-sm font-medium text-gray-700">內容</label>
                <textarea
                  id="content"
                  v-model="FormContent"
                  rows="4"
                  class="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  placeholder="請輸入內容" />
              </div>
            </div>

            <div class="flex justify-center">
              <button
                type="button"
                class="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                @click="sendForm">
                提交
              </button>
            </div>
          </div>
        </UCard>
      </UModal>
    </div>
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
