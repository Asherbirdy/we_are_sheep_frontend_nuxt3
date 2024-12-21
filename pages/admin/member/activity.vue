<script setup lang="ts">
import { useActivity } from "@/apis";
import { useMemberStore } from "@/store/UserStatus";
import { idText } from "typescript";

import { computed, onMounted, reactive, ref, watch } from "vue";

// 1. 獲取數據

const { data: activityData } = await useActivity.showActivity();

console.log(activityData.value);

// const selectedColumns = [
//   {
//     key: "date",
//     label: "日期",
//     // 可以添加格式化函數
//     formatter: (value) => new Date(value).toLocaleDateString("zh-TW"),
//   },
//   {
//     key: "year",
//     label: "年份",
//   },
//   {
//     key: "month",
//     label: "月份",
//   },
//   {
//     key: "title",
//     label: "標題",
//   },
//   {
//     key: "content",
//     label: "內容",
//   },
// ];

const columnsYear = [
  {
    key: "2024",
    label: "2024年",
  },
  {
    key: "2025",
    label: "2025年",
  },
];
const columnsMonth = [
  {
    key: "1",
    label: "1月",
  },
  {
    key: "2",
    label: "2月",
  },
  {
    key: "3",
    label: "3月",
  },
  {
    key: "4",
    label: "4月",
  },
  {
    key: "5",
    label: "5月",
  },
  {
    key: "6",
    label: "6月",
  },
  {
    key: "7",
    label: "7月",
  },
  {
    key: "8",
    label: "8月",
  },
  {
    key: "9",
    label: "9月",
  },
  {
    key: "10",
    label: "10月",
  },
  {
    key: "11",
    label: "11月",
  },
  {
    key: "12",
    label: "12月",
  },
];

const selectedColumnsYear = ref([...columnsYear]);
const selectedColumnsMonth = ref([...columnsYear]);

// const people = [
//   {
//     _id: "1",
//     date: "2024-12-01T22:30:00.000Z",
//     year: 2024,
//     month: 12,
//     title: "Lindsay Walton 的專案",
//     content: "Front-end Developer 的工作內容描述",
//   },
//   {
//     _id: "2",
//     date: "2024-12-05T22:30:00.000Z",
//     year: 2024,
//     month: 12,
//     title: "Courtney Henry 的設計提案",
//     content: "Designer 的專案規劃與設計內容",
//   },
//   {
//     _id: "3",
//     date: "2024-12-10T22:30:00.000Z",
//     year: 2024,
//     month: 12,
//     title: "Tom Cook 的產品方向",
//     content: "Director of Product 的產品策略說明",
//   },
//   {
//     _id: "4",
//     date: "2024-12-15T22:30:00.000Z",
//     year: 2024,
//     month: 12,
//     title: "Whitney Francis 的文案企劃",
//     content: "Copywriter 的文案內容與規劃",
//   },
//   {
//     _id: "5",
//     date: "2024-12-20T22:30:00.000Z",
//     year: 2024,
//     month: 12,
//     title: "Leonard Krasner 的設計專案",
//     content: "Senior Designer 的進階設計提案",
//   },
//   {
//     _id: "6",
//     date: "2024-12-25T22:30:00.000Z",
//     year: 2024,
//     month: 12,
//     title: "Floyd Miles 的設計規範",
//     content: "Principal Designer 的設計系統文件",
//   },
// ];
// 將 people 改為響應式引用
const people = ref(activityData.value || []); // 如果 activityData.value 為空則使用空陣列

console.log(people.value);
</script>

<template>
  <div>
    <div class="flex px-3 gap-2 py-3.5 border-b border-gray-200">
      <USelectMenu v-model="selectedYear" :options="columnsYear" placeholder="年" class="w-20" />
      <USelectMenu v-model="selectedMonth" :options="columnsMonth" placeholder="月" class="w-20" />
      <UButton>查詢</UButton>
    </div>

    <UTable :rows="people" />
    <UButton label="新增活動" />
    <UButton label="刪除活動" />
  </div>
</template>

<style></style>
