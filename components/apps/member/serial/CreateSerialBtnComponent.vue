<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { options } from '#build/eslint.config.mjs'
import { useDistrictApi } from '@/apis'
import { useDistrictId } from '@/store/DistrictInformation'

import { ref, watch } from 'vue'
import { type InferType, object, string } from 'yup'
import { useUserSerialNumberApi } from '~/apis'

import type { Role } from '~/types'

const props = defineProps<{
  onRefresh: () => void
}>()

const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Required'),
})

const state = ref({
  data: {
    districtId: '',
    email: undefined,
    password: undefined,
    role: 'user',
    notes: '',
  },
  modal: false,
})

const handleCreateDistrict = async () => {
  const { execute } = await useUserSerialNumberApi.create({
    role: state.value.data.role,
    districtId: state.value.data.districtId,
    notes: 'test',
  })
  execute()
}

async function onSubmit() {
  await handleCreateDistrict()
  await props.onRefresh()
  state.value.modal = false
}

const useDistrictApiData = useDistrictId()

onMounted(async () => {
  await useDistrictApiData.fetchDistricts()
})

const Roleitems = [
  {
    label: 'DistrictLeader',
    value: 'districtLeader',
  },
  {
    label: 'User',
    value: 'user',
  },
]
const districtStore = useDistrictId() // 獲取 store 實例

// 取得所有區
const { data: allDistrictsResponse } = await useDistrictApi.getAll()
const districts = allDistrictsResponse.value?.districts
if (Array.isArray(districts)) {
  // 檢查傳入的物件是否為陣列
  districtStore.saveIDs(districts)
}
</script>

<template>
  <UButton @click="state.modal = true">
    新增序號
  </UButton>
  <UModal v-model="state.modal">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Modal
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="state.modal = false"
          />
        </div>
      </template>
      <div>
        <UForm
          title="新增序號"
          :schema="schema"
          :state="state.data"
          class="space-y-4"
        >
          <UFormGroup
            label="角色"
            name="role"
          >
            <USelect
              v-model="state.data.role"
              color="primary"
              :options="Roleitems"
            />
          </UFormGroup>
          <UFormGroup
            label="選擇區ID"
            name="districtId"
          >
            <USelect
              v-model="state.data.districtId"
              color="primary"
              :options="useDistrictApiData.districts"
              value-attribute="_id"
              option-attribute="name"
              @change="(value) => (state.data.districtId = value)"
            />
          </UFormGroup>

          <UButton
            type="submit"
            @click="onSubmit"
          >
            Submit
          </UButton>
        </UForm>
      </div>
    </UCard>
  </UModal>
</template>
