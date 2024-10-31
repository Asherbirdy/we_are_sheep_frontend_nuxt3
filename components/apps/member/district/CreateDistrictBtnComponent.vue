<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { useDistrictApi } from '@/apis'
import { type InferType, object, string } from 'yup'

const emit = defineEmits(['refresh'])

const toast = useToast()

const state = ref({
  data: {
    name: '',
  },
  modal: false,
})

const {
  execute: handleCreateDistrict,
  error: createDistrictError,
  status: createDistrictStatus,
} = await useDistrictApi.create(state.value.data)

const schema = object({
  name: string().required('請輸入區的名稱'),
})

const onSubmit = async () => {
  await handleCreateDistrict()
  if (createDistrictError?.value?.data.error === 'CREATE_ERROR') {
    state.value.modal = false
    toast.add({ title: createDistrictError.value.data.msg })
  }
  emit('refresh')
  state.value.modal = false
}
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
