<script setup lang="ts">
import type { GroupedData, Member, State } from '@/types'
import { useMemberApi } from '@/apis'
import { vDraggable } from 'vue-draggable-plus'

definePageMeta({
  layout: 'dashboard',
})

const { data } = useMemberApi.getDistrictMember()

const state = ref<State>({
  data: {},
})

// 將api 轉換成需要的格式
const groupedFunc = (members: Member[]): GroupedData => {
  const groupedData: GroupedData = {}
  members.forEach((member: Member) => {
    const { meetingStatus } = member
    const existingList = groupedData[meetingStatus]?.list || []

    groupedData[meetingStatus] = {
      name: meetingStatus,
      list: [...existingList, member],
    }
  })
  return groupedData
}

watch(data, () => {
  if (data.value?.members) {
    state.value.data = groupedFunc(data.value?.members)
  }
})

const onAdd = (e: any) => {
  console.log('add', e)
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <h4>District Member</h4>
      <UButton color="primary">
        Edit
      </UButton>
    </div>
    <div class="flex flex-col">
      <div
        v-for="draggable in state.data"
        :key="draggable.name"
      >
        <h4>{{ draggable.name }}</h4>
        <section
          v-draggable="[
            draggable.list,
            {
              animation: 150,
              ghostClass: 'ghost',
              group: 'people',
              onAdd,
            },
          ]"
          class="flex flex-col gap-2 p-1 w-300px h-300px m-auto bg-gray-500/5 rounded overflow-auto"
        >
          <div
            v-for="card in draggable.list"
            :key="card._id"
            class="h-30 bg-gray-500/5 rounded p-1"
          >
            {{ card.name }}
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
