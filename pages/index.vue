<script setup lang="ts">
import { useDayjs } from "#dayjs";
import { useActivity } from "@/apis"; // 假設這是你的 API 模組
import { onMounted, ref } from "vue";

// 使用 dayjs-nuxt 插件
const dayjs = useDayjs();

// 活動列表
const activityList = ref([]);
const isLoading = ref(false); // 載入狀態
const errorMessage = ref(""); // 錯誤訊息

// 本地存儲的 Key
const LOCAL_STORAGE_KEY = "activityList";

// 從 LocalStorage 加載資料
const loadFromLocalStorage = () => {
  const cachedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (cachedData) {
    try {
      activityList.value = JSON.parse(cachedData);
      console.log("從 LocalStorage 加載資料:", activityList.value);
    } catch (e) {
      console.error("解析 LocalStorage 資料失敗:", e);
    }
  }
};

// 將資料保存到 LocalStorage
const saveToLocalStorage = () => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(activityList.value));
    console.log("已將資料保存到 LocalStorage");
  } catch (e) {
    console.error("保存到 LocalStorage 失敗:", e);
  }
};

// API 請求邏輯
const fetchData = async () => {
  isLoading.value = true;
  errorMessage.value = ""; // 清空錯誤訊息

  // 使用 dayjs-nuxt 獲取當前年份和月份
  const currentYear = dayjs().format("YYYY"); // 當前年份
  const currentMonth = dayjs().format("M"); // 當前月份（不補 0）

  try {
    console.log("正在拉取資料...", { year: currentYear, month: currentMonth }); // 確認是否執行
    const { data: activityData } = await useActivity.showActivity({
      year: currentYear,
      month: currentMonth,
    });

    console.log("API 回傳資料:", activityData); // 打印完整的 API 回傳資料
    if (activityData && activityData.value?.data) {
      activityList.value = activityData.value.data;
      saveToLocalStorage(); // 保存資料到 LocalStorage
    } else {
      activityList.value = []; // 如果資料格式不正確，設為空陣列
      console.warn("API 回傳資料格式異常:", activityData);
    }
  } catch (error) {
    errorMessage.value = "無法載入活動資料，請稍後再試。";
    console.error("拉取活動資料失敗:", error);
  } finally {
    isLoading.value = false;
  }
};

// 頁面初始化時檢查本地存儲，若無資料則打 API
onMounted(() => {
  loadFromLocalStorage();
  if (activityList.value.length === 0) {
    fetchData();
  }
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
    <div v-else class="p-6">
      <div v-if="activityList.length > 0" class="space-y-4">
        <div
          v-for="(activity, index) in activityList"
          :key="index"
          class="flex justify-between items-center border-b pb-3"
        >
          <a href="#" class="text-black font-bold hover:underline">
            {{ activity.title }}
          </a>
          <span class="text-black text-sm">{{ activity.date }}</span>
        </div>
      </div>
      <div v-else class="text-center text-[#98FB98] py-4">目前沒有活動資料。</div>
    </div>
  </div>
</template>

<style scoped>
/* 如果需要自定義樣式，可以在這裡添加 */
</style>
