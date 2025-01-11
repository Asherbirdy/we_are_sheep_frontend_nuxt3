<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { useDistrictApi } from '@/apis'
import { useDistrictId } from '@/store/DistrictInformation'

import { type InferType, object, string } from 'yup'

// 使用 store

const emit = defineEmits(['refresh'])

const districtStoreName = useDistrictId()

const toast = useToast()

const state = ref({
  data: {
    name: '', // 儲存區的名稱
  },
  modal: false, // 控制 modal 的顯示狀態
})
// 初始化 API 呼叫，用於創建區域
const {
  execute: handleCreateDistrict,
  error: createDistrictError,
  status: createDistrictStatus,
} = await useDistrictApi.create(state.value.data)

// 定義驗證 schema
const schema = object({
  name: string().required('請輸入區的名稱'), // 驗證區名稱是否必填
})

// 提交表單的函數
const onSubmit = async () => {
  districtStoreName.setName(state.value.data.name)
  // 呼叫 API 來創建區域
  await handleCreateDistrict()
  // 檢查是否有錯誤
  if (createDistrictError?.value?.data.error === 'CREATE_ERROR') {
    state.value.modal = false // 關閉 modal
    console.log(state.value) // 輸出當前狀態

    toast.add({ title: createDistrictError.value.data.msg })
  }
  emit('refresh') // 發送 'refresh' 事件以更新資料
  state.value.modal = false // 關閉 modal
}

// export function onSubmit() {

// }
</script>

<template>
  <UButton @click="state.modal = true">
    新增
  </UButton>
  <UModal v-model="state.modal">
    <div class="p-4">
      <UForm
        :schema="schema"
        :state="state.data"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup
          label="名稱"
          name="name"
        >
          <UInput v-model="state.data.name" />
        </UFormGroup>
        <UButton
          type="submit"
          :loading="createDistrictStatus === 'pending'"
        >
          Submit
        </UButton>
      </UForm>
    </div>
  </UModal>
</template>
