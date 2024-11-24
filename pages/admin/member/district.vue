<script setup lang="ts">
import { DistrictApiKey, useDistrictApi } from '@/apis'
import { useDistrictId } from '@/store/DistrictInformation'
import CreateDistrictBtnComponent from '~/components/apps/member/district/CreateDistrictBtnComponent.vue'
import EditDistrictFormComponent from '~/components/apps/member/district/EditDistrictFormComponent.vue'

import type { District } from '~/types'

const districtStoreID = useDistrictId()

definePageMeta({
  layout: 'dashboard',
})

const state = ref({
  modal: {
    edit: false,
    district: {
      _id: '',
      name: '',
      active: false,
    },
  },
})

const {
  data: allDistrictsResponse,
} = await useDistrictApi.getAll()

const columns = [
  { key: '_id', label: 'ID' },
  { key: 'name', label: '名稱' },
  { key: 'active', label: '狀態' },
  { key: 'actions' },
]

const districtList = computed(() => {
  const districts = allDistrictsResponse.value?.districts
  if (Array.isArray(districts)) { // 檢查傳入的物件是否為陣列
    districtStoreID.saveIDs(districts)
  }
  else {
    console.error('districts 是 undefined 或不是一個陣列')
  }

  // 輸出原始的 districts 數據
  // console.log('原始 districts:', districts)

  const processedDistricts = districts?.map((district: District) => {
    const processed = {
      _id: district._id,
      name: district.name,
      active: district.active ? '啟用' : '停用',
    }

    // 輸出處理後的每個 district 對象

    // console.log('處理後的 district:', processed)

    return processed
  }) || []

  return processedDistricts
})

const items = (row: District) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',

    click: () => {
      state.value.modal.edit = true
      state.value.modal.district = row
    },
  }, {
    label: 'Duplicate',
    icon: 'i-heroicons-document-duplicate-20-solid',
  }],
]

const handleRefresh = () => {
  refreshNuxtData(DistrictApiKey.getAll)
  state.value.modal.edit = false
}
</script>

<template>
  <div>
    <div class="flex justify-end">
      <CreateDistrictBtnComponent
        @refresh="handleRefresh"
      />
      <!-- <h2>4444</h2> -->
    </div>
    <UTable
      :rows="districtList"
      :columns="columns"
    >
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <!-- <h2>555</h2> -->
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-ellipsis-horizontal-20-solid"
          />
        </UDropdown>
      </template>
    </UTable>

    <UModal
      v-model="state.modal.edit"
      prevent-close
    >
      <EditDistrictFormComponent
        :data="state.modal.district"
        @refresh="handleRefresh"
      />
    </UModal>
  </div>
</template>
