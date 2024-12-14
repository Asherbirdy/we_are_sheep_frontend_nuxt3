<script setup lang="ts">
import { useActivity } from "@/apis";
import { useMemberStore } from "@/store/UserStatus";
import { idText } from "typescript";

import { computed, onMounted, reactive, ref, watch } from "vue";
//  定義表格
const columns = [
  {
    key: "_id",
    label: "ID",
  },
  {
    key: "name",
    label: "名字",
  },
  // {
  //   key: 'title',
  //   label: '職稱',
  // },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "role",
    label: "角色",
  },
];
// const people6 = ref([])

//  成員明細

const PeopleData = ref([]);

// 表單搜尋功能

// 打API 取得會員列表
// 定義響應式數據
// const data = ref(null)

// 打API 取得會員列表

// const { data } = await useUserApi.showAllUser()
// console.log('output', data.value)

// console.log('1122', typeof data.value)

// 方法 2：使用 onMounted 和 watch
// const activityData = ref(null);

// 1. 獲取數據

const activityState = reactive({
  data: null,
});
const getActivity = async () => {
  const { data: activityData } = await useActivity.showActivity();
  activityState.data = activityData;
  console.log(activityState.data);
  
};

getActivity(); // 執行函數

// ------------------------

// 存會員狀態

// const store = useMemberStore();

// console.log("Pinia", store);

// onMounted(async () => {
//   await store.getMemberStatus();
//   console.log("取會員資料", data.value);
// });
</script>

<template>
  <div class="w-full my-10">
    <h1 class="text-xl">會員列表7777</h1>
    <!-- 會員列表的內容 -->
    <div>
      <!-- pnpm -->
      <!--  -->
    </div>
  </div>
</template>

<style></style>
