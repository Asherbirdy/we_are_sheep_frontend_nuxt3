<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { useDistrictApi } from '@/apis'
import { type InferType, object, string } from 'yup'

const toast = useToast()

const state = ref({
  data: {
    name: '',
  },
  modal: false,
})

const {
  execute: handleCreateDistrict,
  data: createDistrictResponse,
  error: createDistrictError,
} = await useDistrictApi.create(state.value.data)

const schema = object({
  name: string().required('請輸入區的名稱'),
})

async function onSubmit(e: FormSubmitEvent<InferType<typeof schema>>) {
  // eslint-disable-next-line no-console
  console.log(e.data)
  await handleCreateDistrict()
  if (createDistrictError?.value?.data.error === 'CREATE_ERROR') {
    state.value.modal = false
    toast.add({ title: createDistrictError.value.data.msg })
    return
  }
  console.log(createDistrictResponse.value)
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
        <UButton type="submit">
          Submit
        </UButton>
      </UForm>
    </div>
  </UModal>
</template>
