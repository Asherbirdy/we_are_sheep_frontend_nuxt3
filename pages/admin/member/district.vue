<script setup lang="ts">
import { useDistrictApi } from '@/apis'
import CreateDistrictComponent from '~/components/apps/member/district/CreateDistrictBtnComponent.vue'
import type { District } from '~/types'

definePageMeta({
  layout: 'dashboard',
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
    // eslint-disable-next-line no-console
    click: () => console.log('Edit', row.id),
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
  </div>
</template>
