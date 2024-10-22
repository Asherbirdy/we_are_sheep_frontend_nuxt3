<script setup lang='ts'>
import type { District } from '@/types'
import { useDistrictApi } from '@/apis'
import { object, string } from 'yup'

const props = defineProps<{
  data: District | null
}>()

const emit = defineEmits(['refresh'])

const state = ref({
  button: {
    edit: {
      loading: false,
    },
  },
})

// 避免修改資料背景table的資料也在動
const localData = computed(() => {
  return props.data ? { ...props.data } : { _id: '', name: '', active: false }
})

const schema = object({
  name: string().required('請輸入區的名稱'),
})

const onSubmit = async () => {
  state.value.button.edit.loading = true

  await useDistrictApi.edit({
    newName: localData.value.name,
    districtId: localData.value._id,
  }).execute()

  state.value.button.edit.loading = false
  emit('refresh')
}
</script>

<template>
  <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
          編輯區域
        </h3>
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          class="-my-1"
          @click="$emit('refresh')"
        />
      </div>
    </template>
    <UForm
      :schema="schema"
      :state="localData"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormGroup
        label="名稱"
        name="name"
      >
        <UInput v-model="localData.name" />
      </UFormGroup>
      <UButton
        type="submit"
        :loading="state.button.edit.loading"
      >
        Submit
      </UButton>
    </UForm>
  </UCard>
</template>
