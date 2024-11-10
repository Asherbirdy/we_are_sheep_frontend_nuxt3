<script lang="ts" setup>
import type { FormSubmitEvent } from "#ui/types";
import { useAuthApi } from "@/apis";
import { CookieEnums, PublicRoutes } from "@/enums";

import { reactive, ref } from "vue";
import { type InferType, object, string } from "yup";

// 定義導航路由
const routes = [
  {
    label: "生命讀經",
    to: PublicRoutes.Home,
  },
  {
    label: "近期活動",
    to: PublicRoutes.News,
  },
  {
    label: "會員中心",
    to: PublicRoutes.Login,
  },
];

// 控制彈窗開關的變數
const isOpen = ref(false);
// 控制當前顯示的表單（登入或註冊）
const registered = ref(false); // 已註冊
const isLogin = ref(true); // 已登入
const resultStatus = ref(null); // 執行結果

// 登入表單的驗證規則
const loginSchema = object({
  email: string().email("Invalid email").required("Required"),
  password: string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
});

// 註冊表單的驗證規則
const registerSchema = object({
  email: string().email("無效emai").required("Required"),
  password: string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
  confirmPassword: string()
    // .oneOf([ref('password')], 'Passwords must match')
    .required("Required"),
  serialNumber: string().required("Required"), // 新增序號的驗證規則
});

// 使用 Yup 定義的驗證規則類型
type LoginSchema = InferType<typeof loginSchema>;
type RegisterSchema = InferType<typeof registerSchema>;

// 登入表單狀態，包含 email、password 和 confirmPassword
const LoginState = ref({
  email: "asherbirder@gmail.com",
  password: "password",
  // confirmPassword: '',
});
// 註冊表單狀態，包含 email、password 和 confirmPassword
const RegisterState = ref({
  name: "",
  email: "@gmail.com",
  password: "password",
  confirmPassword: "password",
  serialNumber: "",
});

const {
  data: loginResponse,
  // execute, // 一個可以用來刷新handler函數傳回的資料的函數。
  execute: loginExecute, // 一個可以用來刷新handler函數傳回的資料的函數。
  error: loginError,
  status: loginStatus,
} = await useAuthApi.login(LoginState.value); //  會傳state form 表單的值進 useAuthApi.ts

const {
  data: registerResponse,
  execute: registerExecute, // 一個可以用來刷新handler函數傳回的資料的函數。
  error: registerError,
  status: registerStatus,
} = await useAuthApi.register(RegisterState.value); //  會傳state form 表單的值進 useAuthApi.ts

// 切換到登入表單
const showLogin = () => {
  registered.value = true; // 顯示登入表單
};

// 切換到註冊表單
const showRegister = () => {
  registered.value = false; // 顯示註冊表單
};

// 顯示定義登入、註冊結果
const setStatus = (status: boolean) => {
  resultStatus.value = status;
  setTimeout(() => {
    resultStatus.value = null;
  }, 2000);
  //
};

// 登入表單提交處理函數
const onSubmit = async (event: FormSubmitEvent<LoginSchema>) => {
  // 登入邏輯
  await loginExecute();
  console.log(LoginState.value.email);
  console.log(LoginState.value.password);

  console.log("LoginState", event.data);
  if (loginError.value) {
    // alert("登入錯誤");
    setStatus(false);
  }
  const accessTokenCookie = useCookie(CookieEnums.AccessToken);
  const refreshTokenCookie = useCookie(CookieEnums.RefreshToken);
  if (loginResponse.value) {
    accessTokenCookie.value = loginResponse.value.token.accessTokenJWT;
    refreshTokenCookie.value = loginResponse.value.token.refreshTokenJWT;
    setStatus(true);
  }
};

// 註冊表單提交處理函數
const onRegister = async (event: FormSubmitEvent<RegisterSchema>) => {
  // 註冊邏輯
  await registerExecute();
  // console.log(RegisterState.value.email);
  // console.log(RegisterState.value.password);
  // console.log("RegisterState", event.data);
  if (registerError.value) {
    alert("註冊錯誤");
    setStatus(false);
  }
  const registerCookie = useCookie(CookieEnums.TokenUser);
  if (registerResponse.value) {
    console.log(registerResponse.value);
    registerCookie.value = JSON.stringify(registerResponse.value?.tokenUser);
    setStatus(true);
    registered.value = true;
  }
};

// 彈窗開關函數
const Modal = () => {
  isOpen.value = !isOpen.value; // 切換彈窗顯示狀態
  console.log("彈窗被打開");
};

// 切換表單的函數
function toggleForm(linkTo: string) {
  registered.value = linkTo === "#login"; // 根據鏈接決定顯示哪個表單
  isOpen.value = true; // 打開彈窗
}

// 定義表單切換鏈接
const links = [
  {
    label: "登入",
    to: "#login",
  },
  {
    label: "註冊",
    to: "#register",
  },
];
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-gray-100 p-4 flex justify-between">
      <div>LOGO</div>
      <div class="hidden md:block">
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
      class="fixed bottom-0 left-0 right-0 bg-gray-100 shadow-lg none md:hidden">
      <div class="grid grid-cols-3 h-16">
        <div
          v-for="route in routes"
          :key="route.to"
          class="flex items-center justify-center border-r border-gray-200 last:border-r-0">
          <NuxtLink :to="route.to" class="text-gray-600" @click="Modal">
            {{ route.label }}
          </NuxtLink>
        </div>
      </div>
    </nav>

    <div class="relative z-10">
      <UModal v-model="isOpen">
        <div class="flex">
          <button
            class="base font rounded block flex-1 relative group"
            :class="[{ active: registered }]"
            @click="showLogin">
            登入
          </button>
          <button
            class="base font rounded block flex-1 relative group"
            :class="[{ active: !registered }]"
            @click="showRegister">
            註冊
          </button>
        </div>
        <div class="form-box p-4">
          <!-- 登入表單 -->
          <UForm
            v-if="registered"
            :schema="loginSchema"
            :state="LoginState"
            class="space-y-4">
            <UFormGroup label="Email" name="email">
              <UInput v-model="LoginState.email" />
              <!-- 綁定 email -->
            </UFormGroup>

            <UFormGroup label="Password" name="password">
              <UInput v-model="LoginState.password" type="password" />
              <!-- 綁定密碼 -->
            </UFormGroup>

            <div class="flex justify-center">
              <UButton
                :loading="loginStatus === 'pending'"
                type="submit"
                @click="onSubmit">
                登入
              </UButton>
            </div>
          </UForm>

          <!-- 註冊表單 -->
          <UForm
            v-else
            :schema="registerSchema"
            :state="RegisterState"
            class="space-y-4"
            @submit="onRegister">
            <UFormGroup label="Name" name="name">
              <UInput v-model="RegisterState.name" />
              <!-- 綁定 email -->
            </UFormGroup>
            <UFormGroup label="Email" name="email">
              <UInput v-model="RegisterState.email" />
              <!-- 綁定 email -->
            </UFormGroup>

            <UFormGroup label="Password" name="password">
              <UInput v-model="RegisterState.password" type="password" />
              <!-- 綁定密碼 -->
            </UFormGroup>

            <UFormGroup label="Confirm Password" name="confirmPassword">
              <UInput v-model="RegisterState.confirmPassword" type="password" />
              <!-- 綁定確認密碼 -->
            </UFormGroup>
            <UFormGroup label="序號" name="serialnumber">
              <UInput v-model="RegisterState.serialNumber" type="text" />

              <!-- 綁定確認序號 -->
            </UFormGroup>
            <div class="flex justify-center">
              <UButton
                class="bg-blue-500 text-white p-2 rounded-md"
                :loading="registerStatus === 'pending'"
                type="submit">
                註冊
              </UButton>
            </div>
          </UForm>
        </div>

        <!-- 顯示登入或註冊結果 -->
        <div v-if="!(resultStatus === null)" class="result-status p-4">
          <div
            v-if="resultStatus"
            class="flex flex-col items-center justify-center">
            <UIcon
              name="material-symbols:check-circle"
              class="text-green-500 text-7xl" />
            <div class="text-white">成功</div>
          </div>
          <div v-else class="flex flex-col items-center justify-center">
            <UIcon
              name="material-symbols:cancel"
              class="text-red-500 text-7xl" />
            <div class="text-white">失敗</div>
          </div>
        </div>
      </UModal>
      <!-- <h2>會員中心</h2> -->
    </div>
    <footer class="bg-gray-100 p-4 mt-16">
      <div class="text-center">Footer</div>
    </footer>
  </div>
</template>

<style scoped>
.base {
  padding: 10px 0;
  /* 垂直填充 */
  border: none;
  cursor: pointer;
}

.font {
  font-weight: 500;
}

.rounded {
  border-radius: 0.375rem;
}

.block {
  display: block;
  /* 確保按鈕是塊級元素 */
}

.group.active::after {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -5px;
  /* 調整底線與文字的距離 */
  width: 30%;
  /* 控制底線的長度 */
  height: 2px;
  /* 控制底線的寬度 */
  background-color: black;
  /* 底線顏色 */
}

nav {
  background-color: palegreen;
}

.result-status {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}
</style>
