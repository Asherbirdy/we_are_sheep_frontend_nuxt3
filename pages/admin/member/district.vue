<script setup lang="ts">
import { useDistrictApi } from '@/apis'
import CreateDistrictComponent from '~/components/apps/member/district/CreateDistrictBtnComponent.vue'
import type { District } from '~/types'

definePageMeta({
  layout: 'dashboard',
})

const state = ref({
  modal: {
    edit: false,
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

const districtList = allDistrictsResponse.value?.districts.map(
  (district: District) => ({
    _id: district._id,
    name: district.name,
    active: district.active ? '啟用' : '停用',
  }),
)

const items = (row: any) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',

    click: () => {
      state.value.modal.edit = true
    },
  }, {
    label: 'Duplicate',
    icon: 'i-heroicons-document-duplicate-20-solid',
  }],
]
</script>

<template>
  <div>
    <div class="flex justify-end">
      <CreateDistrictComponent />
    </div>
    <UTable
      :rows="districtList"
      :columns="columns"
    >
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-ellipsis-horizontal-20-solid"
          />
        </UDropdown>
      </template>
    </UTable>
    <UModal v-model="state.modal.edit">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <Placeholder class="h-8" />
        </template>

        <Placeholder class="h-32" />

        <template #footer>
          <Placeholder class="h-8" />
        </template>
      </UCard>
    </UModal>
  </div>
</template>
