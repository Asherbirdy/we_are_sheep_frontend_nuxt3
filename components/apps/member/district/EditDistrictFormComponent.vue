<script setup lang='ts'>
import type { District } from '@/types'
import { useDistrictApi } from '@/apis'
import { object, string } from 'yup'

const props = defineProps<{
  data: District | null
}>()

const state = ref({
  data: {
    _id: '',
    name: '',
    active: false,
  },
})

const { data } = toRefs(props)

const schema = object({
  name: string().required('請輸入區的名稱'),
})

const onSubmit = async () => {
  const payload = {
    newName: state.value.data.name,
    districtId: data.value?._id ?? '',
  }
  const { execute } = await useDistrictApi.edit(payload)
  await execute()
}

onMounted(() => {
  if (data.value) {
    state.value.data = data.value
    console.log(state.value.data.name)
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
      >
        Submit
      </UButton>
    </UForm>
  </UCard>
</template>
