<script lang="ts" setup>
import type { FormSubmitEvent } from "#ui/types";
import { PublicRoutes } from "@/enums";
import { reactive, ref } from "vue";
import { type InferType, object, string } from "yup";
import windows from "./windows.vue";

const routes = [
  //  Header 選單
  {
    label: "生命讀經",
    to: PublicRoutes.Home,
  },
  {
    label: "近期活動",
    to: PublicRoutes.News,
  },
  // {
  //   label: '會員中心',
  //   to: PublicRoutes.Login,
  // },
];

const isOpen = ref(false);
const isLogin = ref(true); // 新增狀態變量來控制當前顯示的表單

const loginSchema = object({
  email: string().email("Invalid email").required("Required"),
  password: string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
});

const registerSchema = object({
  email: string().email("Invalid email").required("Required"),
  password: string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
  confirmPassword: string()
    .oneOf([ref("password")], "Passwords must match")
    .required("Required"),
  serialNumber: string().required("Required"), // 新增序號的驗證規則
});

type LoginSchema = InferType<typeof loginSchema>;
type RegisterSchema = InferType<typeof registerSchema>;

const state = reactive({
  email: "",
  password: "",
  confirmPassword: "",
  serialNumber: "", // 新增序號的狀態變量
});

// 切換表單的函數
function toggleForm(linkTo: string) {
  isLogin.value = linkTo === "#login";
  isOpen.value = true;
}

async function onSubmit(event: FormSubmitEvent<LoginSchema | RegisterSchema>) {
  // Do something with event.data
  console.log(event.data);
}

const links = [
  {
    label: "登入",
    to: "#login", // 修改這裡的路徑
  },
  {
    label: "註冊",
    to: "#register", // 修改這裡的路徑
  },
  {
    // 其他鏈接
  },
];
</script>

<template>
  <div>
    <div class="flex flex-col min-h-screen">
      <header class="bg-gray-100 p-4 flex justify-between">
        <div>LOGO</div>
        <div class="md:block hidden">
          <nav class="flex space-x-4">
            <NuxtLink
              v-for="route in routes"
              :key="route.to"
              :to="route.to"
              class="text-gray-600">
              {{ route.label }}
            </NuxtLink>
          </nav>
        </div>
      </header>
      <main class="flex-grow mx-2">
        <slot />
      </main>
      <nav
        class="md:hidden block fixed bottom-0 left-0 right-0 bg-white shadow-lg">
        <div class="grid grid-cols-3 h-16">
          <div
            v-for="route in routes"
            :key="route.to"
            class="flex items-center justify-center border-r border-gray-200 last:border-r-0">
            <NuxtLink :to="route.to" class="text-gray-600">
              {{ route.label }}
            </NuxtLink>
          </div>
          <NuxtLink @click="isOpen = true"> 會員中心 </NuxtLink>
        </div>
      </nav>
      <footer class="bg-gray-100 p-4 mt-16" />
    </div>

    <div>
      <UHorizontalNavigation :links="links">
        <template #default="{ link }">
          <NuxtLink :to="link.to" @click.prevent="toggleForm(link.to)">
            <span class="group-hover:text-primary relative">{{
              link.label
            }}</span>
          </NuxtLink>
        </template>
      </UHorizontalNavigation>
      <UModal v-model="isOpen">
        <div class="p-4">
          <UHorizontalNavigation
            :links="links"
            class="border-b border-gray-200 dark:border-gray-800" />
          <UForm
            :schema="isLogin ? loginSchema : registerSchema"
            :state="state"
            class="space-y-4"
            @submit="onSubmit">
            <!-- 登入表單特定內容 -->
            <template v-if="isLogin">
              <div class="login-custom-content">
                <p>歡迎回來，請登入您的帳戶。</p>
                <p>如果您忘記密碼，請點擊這裡重設。</p>
                <p>登入後，您將能夠訪問您的個人資料和設置。</p>
              </div>
            </template>

            <!-- 註冊表單特定內容 -->
            <template v-else>
              <div class="register-custom-content">
                <p>創建一個新帳戶以開始您的旅程！</p>
                <p>請填寫以下資訊以完成註冊。</p>
                <UFormGroup label="Serial Number" name="serialNumber">
                  <UInput v-model="state.serialNumber" />
                </UFormGroup>
                <p>確保您的密碼至少有8個字符，並包含大小寫字母及數字。</p>
              </div>
            </template>

            <UFormGroup label="Email" name="email">
              <UInput v-model="state.email" />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
              <UInput v-model="state.password" type="password" />
            </UFormGroup>
            <UFormGroup label="序號" name="serialNumber">
              <UInput v-model="state.serialNumber" type="password" />
            </UFormGroup>

            <!-- 登入 -->
            <UFormGroup
              v-if="!isLogin"
              label="Confirm Password"
              name="confirmPassword">
              <UInput v-model="state.confirmPassword" type="password" />
            </UFormGroup>

            <UButton type="submit">
              {{ isLogin ? "登入" : "註冊" }}
            </UButton>
          </UForm>
          <Placeholder class="h-48" />
        </div>
      </UModal>
    </div>
  </div>
</template>
