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


const isOpen = ref(false)

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
        </UCard>
      </UModal>
    </div>
  </div>
</template>

<style></style>
