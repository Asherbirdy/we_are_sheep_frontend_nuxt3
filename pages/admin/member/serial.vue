<script setup lang="ts">
import { useUserSerialNumberApi } from '@/apis'
import CreateSerialBtnComponent from '@/components/apps/member/serial/CreateSerialBtnComponent.vue'
import type { UserSerialNumberList } from '~/types'

const serialNumberList = ref([])

const { data: serialNumbers, refresh: refreshSerialNumbers } = await useUserSerialNumberApi.getAll({
  transform: (data) => {
    return data.userSerialNumber.map((
      serial: UserSerialNumberList,
    ) => ({
      id: serial._id,
      isUsed: serial.isUsed ? '已使用' : '未使用',
      districtId: serial.districtId?.name || '未指定',
      role: serial.role || '未指定',
      notes: serial.notes || '無備註',
    })) || []
  },
})

serialNumberList.value = serialNumbers.value
// const apiX = await useUserSerialNumberApi.getAll()
// const serialNumbers = apiX.data

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'isUsed', label: '狀態' },
  { key: 'districtId', label: '區' },
  { key: 'role', label: '權限' },
  { key: 'notes', label: '備註' },
  { key: 'actions' },
]

// const serialNumberList = serialNumbers.value?.userSerialNumber.map((
//   serial: UserSerialNumberList,
// ) => ({
//   id: serial._id,
//   isUsed: serial.isUsed ? '已使用' : '未使用',
//   districtId: serial.districtId?.name || '未指定',
//   role: serial.role || '未指定',
//   notes: serial.notes || '無備註',
// })) || []

const items = (row: any) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    // eslint-disable-next-line no-console
    click: () => console.log('Edit', row.id),
  }],
]

const onRefresh = () => {
  refreshSerialNumbers()
  serialNumberList.value = serialNumbers.value
  // TODO: 新增序號後, 列表如何自動更新 - xxxxx21313123 anita
}
</script>

<template>
  <div>
    <div class="flex justify-end">
      <CreateSerialBtnComponent :on-refresh="onRefresh" />
    </div>
    <UTable
      :rows="serialNumberList"
      :columns="columns"
    >
      <template #role-data="{ row }">
        <span style="white-space: normal; max-width: 200px;">
          {{ row.role }}
        </span>
      </template>

      <template #isUsed-data="{ row }">
        <span>
          {{ row.isUsed }}
        </span>
      </template>

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
