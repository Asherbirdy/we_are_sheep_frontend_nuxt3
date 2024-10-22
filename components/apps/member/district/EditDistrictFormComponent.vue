<script setup lang='ts'>
import type { District } from '@/types'
import { useDistrictApi } from '@/apis'
import { object, string } from 'yup'

const props = defineProps<{
  data: District | null
}>()

const emit = defineEmits(['refresh'])
const state = ref({
  data: {
    _id: '',
    name: '',
    active: false,
  },
  buttonLoading: false,
})

const { data } = toRefs(props)

const schema = object({
  name: string().required('請輸入區的名稱'),
})

const onSubmit = async () => {
  state.value.buttonLoading = true
  const { execute } = await useDistrictApi.edit({
    newName: state.value.data.name,
    districtId: props.data?._id ?? '',
  })
  await execute()
  emit('refresh')
}

onMounted(() => {
  if (data.value) {
    state.value.data = data.value
  }
})
</script>

<template>
  <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
    <template #header>
      <div>編輯區域</div>
    </template>
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
        :loading="state.buttonLoading"
      >
        Submit
      </UButton>
    </UForm>
  </UCard>
</template>
