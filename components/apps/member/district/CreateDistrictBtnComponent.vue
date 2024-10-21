<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { type InferType, object, string } from 'yup'

const state = ref({
  data: {
    name: undefined,
  },
  modal: false,
})

const schema = object({
  name: string().required('請輸入區的名稱'),
})

async function onSubmit(e: FormSubmitEvent<InferType<typeof schema>>) {
  // eslint-disable-next-line no-console
  console.log(e.data)
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
