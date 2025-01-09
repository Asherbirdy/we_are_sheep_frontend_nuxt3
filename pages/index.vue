<script setup lang="ts">
import { useDayjs } from "#dayjs";
import { useActivity } from "@/apis"; // 假設這是你的 API 模組
import { onMounted, ref } from "vue";

// 使用 dayjs-nuxt 插件
const dayjs = useDayjs();

// 活動列表
// const activityList = ref([]);
const isLoading = ref(false); // 載入狀態
const errorMessage = ref(""); // 錯誤訊息

const { data: activityData, status } = await useActivity.showActivity({
  year: dayjs().format("YYYY"), // 詢問為何是payload
  month: dayjs().format("M"),
});
</script>

<template>
  <div class="container mx-auto mt-8 bg-white rounded-lg shadow">
    <!-- 載入中狀態 -->
    <div v-if="isLoading" class="text-center py-4 text-[#98FB98]">資料載入中...</div>

    <!-- 錯誤訊息 -->
    <div v-else-if="errorMessage" class="text-center text-[#98FB98] py-4">
      {{ errorMessage }}
    </div>

    <!-- 活動列表 -->
    <div class="p-6">
      <!-- {{ activityData }} -->
      <div class="space-y-4">
        <div
          v-for="(activity, index) in activityData?.data"
          :key="index"
          class="flex justify-between items-center border-b pb-3">
          <a href="#" class="text-black font-bold hover:underline">
            {{ activity.title }}
          </a>
          <span class="text-black text-sm">{{ activity.date }}</span>
        </div>
      </div>
      <!-- <div class="text-center text-[#98FB98] py-4">目前沒有活動資料。</div> -->
    </div>
  </div>
</template>

<style scoped>
/* 如果需要自定義樣式，可以在這裡添加 */
</style>
