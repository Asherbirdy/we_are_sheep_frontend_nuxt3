<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { Member } from '@/types'
import { useMemberApi } from '@/apis'
import { vDraggable } from 'vue-draggable-plus'

definePageMeta({
  layout: 'dashboard',
})
const { data } = useMemberApi.getDistrictMember()

interface State {
  data: GroupedData
}

interface GroupedData {
  [key: string]: { name: string, list: Member[] }
}

const state = ref<State>({
  data: {},
})

// 將api 轉換成需要的格式
const groupedFunc = (members: Member[]) => {
  const groupedData: GroupedData = {}
  members.forEach((member: Member) => {
    const { meetingStatus } = member
    groupedData[meetingStatus] = {
      name: meetingStatus,
      list: [...(groupedData[meetingStatus]?.list || []), member],
    }
  })
  return groupedData
}

watch(data, () => {
  if (data.value?.members) {
    state.value.data = groupedFunc(data.value?.members)
    console.log('state.value.data', state.value.data)
  }
})

function onUpdate(e: any) {
  console.log('update', e.moved)
}
function onAdd(e: any) {
  console.log('add', e)
}
function onRemove(e: any) {
  console.log('remove', e.removed)
}
</script>

<template>
  <div>
    <div class="flex flex-col">
      <div
        v-for="(item, index) in state.data"
        :key="index"
      >
        <h4>{{ item.name }}</h4>
        <section
          v-draggable="[
            item.list,
            {
              animation: 150,
              ghostClass: 'ghost',
              group: 'people',
              onUpdate,
              onAdd,
              onRemove,
            },
          ]"
          class="flex flex-col gap-2 p-1 w-300px h-300px m-auto bg-gray-500/5 rounded overflow-auto"
        >
          <div
            v-for="card in item.list"
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
