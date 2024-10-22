<script setup lang="ts">
import { useDistrictApi } from '@/apis'
import CreateDistrictBtnComponent from '~/components/apps/member/district/CreateDistrictBtnComponent.vue'
import EditDistrictFormComponent from '~/components/apps/member/district/EditDistrictFormComponent.vue'
import type { District } from '~/types'

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
  refresh: refreshDistricts,
} = await useDistrictApi.getAll()

const columns = [
  { key: '_id', label: 'ID' },
  { key: 'name', label: '名稱' },
  { key: 'active', label: '狀態' },
  { key: 'actions' },
]

const districtList = computed(() =>
  allDistrictsResponse.value?.districts.map(
    (district: District) => ({
      _id: district._id,
      name: district.name,
      active: district.active ? '啟用' : '停用',
    }),
  ) || [],
)

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
  refreshDistricts()
  state.value.modal.edit = false
}
</script>

<template>
  <div>
    <div class="flex justify-end">
      <CreateDistrictBtnComponent
        @refresh="refreshDistricts"
      />
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
