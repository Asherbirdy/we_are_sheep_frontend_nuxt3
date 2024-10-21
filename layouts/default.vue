<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types'
import { PublicRoutes } from '@/enums'
import { reactive, ref } from 'vue'
import { type InferType, object, string } from 'yup'

// 定義導航路由
const routes = [
  {
    label: '生命讀經',
    to: PublicRoutes.Home,
  },
  {
    label: '近期活動',
    to: PublicRoutes.News,
  },
  {
    label: '會員中心',
    to: PublicRoutes.Login,
  },
]

// 控制彈窗開關的變數
const isOpen = ref(false)
// 控制當前顯示的表單（登入或註冊）
const isLogin = ref(true)

// 登入表單的驗證規則
const loginSchema = object({
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Required'),
})

// 註冊表單的驗證規則
const registerSchema = object({
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Required'),
  confirmPassword: string()
    .oneOf([ref('password')], 'Passwords must match')
    .required('Required'),
  serialNumber: string().required('Required'), // 新增序號的驗證規則
})

// 使用 Yup 定義的驗證規則類型
type LoginSchema = InferType<typeof loginSchema>
type RegisterSchema = InferType<typeof registerSchema>

// 表單狀態，包含 email、password 和 confirmPassword
const state = reactive({
  email: '',
  password: '',
  confirmPassword: '',
})

// 切換到登入表單
const showLogin = () => {
  isLogin.value = true // 顯示登入表單
}

// 切換到註冊表單
const showRegister = () => {
  isLogin.value = false // 顯示註冊表單
}

// 登入表單提交處理函數
const onSubmit = (event: FormSubmitEvent<LoginSchema>) => {
  // 登入邏輯
  console.log('登入', event.data)
}

// 註冊表單提交處理函數
const onRegister = (event: FormSubmitEvent<RegisterSchema>) => {
  // 註冊邏輯
  console.log('註冊', event.data)
}

// 彈窗開關函數
const Modal = () => {
  isOpen.value = !isOpen.value // 切換彈窗顯示狀態
  console.log('彈窗被打開')
}

// 切換表單的函數
function toggleForm(linkTo: string) {
  isLogin.value = linkTo === '#login' // 根據鏈接決定顯示哪個表單
  isOpen.value = true // 打開彈窗
}

// 定義表單切換鏈接
const links = [
  {
    label: '登入',
    to: '#login',
  },
  {
    label: '註冊',
    to: '#register',
  },
]
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="bg-gray-100 p-4 flex justify-between">
      <div>
        LOGO
      </div>
      <div class="hidden md:block">
        <nav class="flex space-x-4">
          <NuxtLink
            v-for="route in routes"
            :key="route.to"
            :to="route.to"
            class="text-gray-600"
          >
            {{ route.label }}
          </NuxtLink>
        </nav>
      </div>
    </header>
    <main class="flex-grow mx-2">
      <slot />
    </main>
    <nav class="block md:hidden fixed bottom-0 left-0 right-0 bg-gray-100 shadow-lg">
      <div class="grid grid-cols-3 h-16">
        <div
          v-for="route in routes"
          :key="route.to"
          class="flex items-center justify-center border-r border-gray-200 last:border-r-0"
        >
          <NuxtLink
            :to="route.to"
            class="text-gray-600"
            @click="Modal"
          >
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
            @click="showLogin"
          >
            登入
          </button>
          <button
            class="base font rounded block flex-1 relative group"
            @click="showRegister"
          >
            註冊
          </button>
        </div>
        <div class="p-4">
          <!-- 登入表單 -->
          <UForm
            v-if="isLogin"
            :schema="loginSchema"
            :state="state"
            class="space-y-4"
            @submit="onSubmit"
          >
            <UFormGroup
              label="Email"
              name="email"
            >
              <UInput v-model="state.email" />
              <!-- 綁定 email -->
            </UFormGroup>

            <UFormGroup
              label="Password"
              name="password"
            >
              <UInput
                v-model="state.password"
                type="password"
              />
              <!-- 綁定密碼 -->
            </UFormGroup>

            <div class="flex justify-center">
              <UButton type="submit">
                登入
              </UButton>
            </div>
          </UForm>

          <!-- 註冊表單 -->
          <UForm
            v-else
            :schema="registerSchema"
            :state="state"
            class="space-y-4"
            @submit="onRegister"
          >
            <UFormGroup
              label="Email"
              name="email"
            >
              <UInput v-model="state.email" />
              <!-- 綁定 email -->
            </UFormGroup>

            <UFormGroup
              label="Password"
              name="password"
            >
              <UInput
                v-model="state.password"
                type="password"
              />
              <!-- 綁定密碼 -->
            </UFormGroup>

            <UFormGroup
              label="Confirm Password"
              name="confirmPassword"
            >
              <UInput
                v-model="state.confirmPassword"
                type="password"
              />
              <!-- 綁定確認密碼 -->
            </UFormGroup>
            <UFormGroup
              label="序號"
              name="serialnumber"
            >
              <UInput type="number" />
              <!-- 綁定確認序號 -->
            </UFormGroup>
            <div class="flex justify-center">
              <UButton type="submit">
                註冊
              </UButton>
            </div>
          </UForm>
        </div>
      </UModal>
      <h2>會員中心</h2>
    </div>
    <footer class="bg-gray-100 p-4">
      <div class="text-center">
        Footer
      </div>
    </footer>
  </div>
</template>

<style scoped>
.base {
  padding: 10px 0; /* 垂直填充 */
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
  display: block; /* 確保按鈕是塊級元素 */
}
.group:hover::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -5px; /* 調整底線與文字的距離 */
  width: 30%; /* 控制底線的長度 */
  height: 2px; /* 控制底線的寬度 */
  background-color: black; /* 底線顏色 */
}
nav{
  background-color: palegreen;
}
footer{
  height: 60vh;
  background-color: olive;
}
</style>

