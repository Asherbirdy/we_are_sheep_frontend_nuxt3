<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { GetDistrictMemberResponse } from '@/types'
import { useMemberApi } from '@/apis'
import { ref } from 'vue'

import { vDraggable } from 'vue-draggable-plus'
import { useRequestApi } from '~/composables/useRequestApi'

definePageMeta({
  layout: 'dashboard',
})
const { data } = useMemberApi.getDistrictMember()

const state = ref({
  data: [] as any,
})

// Add this interface above the transformMembers function
interface GroupedData {
  [key: string]: {
    name: string
    list: {
      name: string
      id: string
    }[]
  }
}

const groupedFunc = (members: any) => {
  const groupedData: GroupedData = {}
  members.forEach((member: any) => {
    const status = member.meetingStatus
    groupedData[status] = {
      name: status,
      list: [...(groupedData[status]?.list || []), {
        name: member.name,
        id: member._id,
      }],
    }
  })
  return groupedData
}

watch(data, () => {
  state.value.data = groupedFunc(data.value?.members)
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
            :key="card.id"
            class="h-30 bg-gray-500/5 rounded p-1"
          >
            {{ card.name }}
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
