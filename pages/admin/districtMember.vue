<script setup lang="ts">
import type { MeetingStatus, Member, MemberDragData, State, TransformedToDraggableData } from '@/types'
import { useMemberApi } from '@/apis'
import { type DraggableEvent, vDraggable } from 'vue-draggable-plus'

definePageMeta({
  layout: 'dashboard',
})

const { data: handleGetDistrictMember } = useMemberApi.getDistrictMember()

const state = ref<State>({
  data: {},
  edited: [],
})

// 將api 轉換成需要的格式
const groupedFunc = (members: Member[]): TransformedToDraggableData => {
  const groupedData: TransformedToDraggableData = {}
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

watch(handleGetDistrictMember, () => {
  if (handleGetDistrictMember.value?.members) {
    state.value.data = groupedFunc(handleGetDistrictMember.value?.members)
  }
})

const draggableAdd = (e: DraggableEvent) => {
  const toStatus = e.to.previousElementSibling?.textContent?.trim() as MeetingStatus

  const data: MemberDragData = {
    _id: e.data._id,
    name: e.data.name,
    meetingStatus: toStatus,
  }

  state.value.edited.push(data as Member)
}
</script>

<template>
  <div>
    <h4>District Member</h4>
    <UButton
      v-if="state.edited.length > 0"
      color="primary"
      block
    >
      更新名單
    </UButton>
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
              onAdd: draggableAdd,
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
