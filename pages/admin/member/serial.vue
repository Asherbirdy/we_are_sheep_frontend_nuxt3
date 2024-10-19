<script setup lang="ts">
import { ref } from 'vue'

const columns = [{
  key: 'name',
  label: '狀態',
}, {
  key: 'title',
  label: '區',
}, {
  key: 'email',
  label: '權限',
}, {
  key: 'role',
  label: '備註',
}, {
  key: 'actions',
}]

const people = [{
  id: 1,
  name: 'Lindsay Walton',
  title: 'Frontasdasdasdasasasasdassa-end Developer',
  email: 'lindsay.walton@example.com',
  role: 'Member',
}, {
  id: 2,
  name: 'Courtney Henry',
  title: 'Designer',
  email: 'courtney.henry@example.com',
  role: 'Admin',
}, {
  id: 3,
  name: 'Tom Cook',
  title: 'Director of Product',
  email: 'tom.cook@example.com',
  role: 'Member',
}, {
  id: 4,
  name: 'Whitney Francis',
  title: 'Copywriter',
  email: 'whitney.francis@example.com',
  role: 'Admin',
}, {
  id: 5,
  name: 'Leonard Krasner',
  title: 'Senior Designer',
  email: 'leonard.krasner@example.com',
  role: 'Owner',
}, {
  id: 6,
  name: 'Floyd Miles',
  title: 'Principal Designer',
  email: 'floyd.miles milesmilesmile smilesm ile smilesmilesmil esmilesmilesmil esmile smilesm ilesmiles@exam ple.com',
  role: 'Member',
}]

const items = (row: any) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row.id),
  }, {
    label: 'Duplicate',
    icon: 'i-heroicons-document-duplicate-20-solid',
  }],
  [{
    label: 'Archive',
    icon: 'i-heroicons-archive-box-20-solid',
  }, {
    label: 'Move',
    icon: 'i-heroicons-arrow-right-circle-20-solid',
  }],
  [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
  }],
]
</script>

<template>
  <div>
    <div class="flex justify-end">
      <UButton>
        新增
      </UButton>
    </div>
    <UTable
      :rows="people"
      :columns="columns"
    >
      <template #email-data="{ row }">
        <span
          style="white-space: normal; max-width: 200px;"
        >  <!-- {{ edit_2 }}: 修改限制长度的类 -->
          {{ row.email }}
        </span>
      </template>

      <template #name-data="{ row }">
        <span
          class="truncate w-[100px] text-red-500"
        >
          {{ row.name }}
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
