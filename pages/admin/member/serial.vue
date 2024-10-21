<script setup lang="ts">
import { useUserSerialNumberApi } from '@/apis'
import CreateSerialBtnComponent from '@/components/apps/member/serial/CreateSerialBtnComponent.vue'
import type { UserSerialNumberList } from '~/types'

const { data: serialNumbers } = await useUserSerialNumberApi.getAll()

const columns = [
  { key: 'isUsed', label: '狀態' },
  { key: 'districtId', label: '區' },
  { key: 'role', label: '權限' },
  { key: 'notes', label: '備註' },
  { key: 'actions' },
]

const serialNumberList = serialNumbers.value?.userSerialNumber.map((
  serial: UserSerialNumberList,
) => ({
  id: serial._id,
  isUsed: serial.isUsed ? '已使用' : '未使用',
  districtId: serial.districtId?.name || '未指定',
  role: serial.role || '未指定',
  notes: serial.notes || '無備註',
})) || []

const items = (row: any) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    // eslint-disable-next-line no-console
    click: () => console.log('Edit', row.id),
  }],
]
</script>

<template>
  <div>
    <div class="flex justify-end">
      <CreateSerialBtnComponent />
    </div>
    <UTable
      :rows="serialNumberList"
      :columns="columns"
    >
      <template #role-data="{ row }">
        <span
          style="white-space: normal; max-width: 200px;"
        >
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
