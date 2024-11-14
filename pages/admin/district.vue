<!-- eslint-disable no-console -->
<script setup lang="ts">
import { useMemberApi } from '@/apis'
import { useDraggable } from 'vue-draggable-plus'

const { data } = useMemberApi.getDistrictMember()

definePageMeta({
  layout: 'dashboard',
})

interface DraggableItem {
  name: string
  id: string
  meetingStatus: string
}

const listA = ref<DraggableItem[]>([])
const listB = ref<DraggableItem[]>([])
const listARef = ref<HTMLElement | null>(null)
const listBRef = ref<HTMLElement | null>(null)

watch(data, (newData) => {
  if (newData?.members) {
    listA.value = newData.members.A.map(member => ({
      name: member.name,
      id: member._id,
      meetingStatus: member.meetingStatus,
    }))

    listB.value = newData.members.B.map(member => ({
      name: member.name,
      id: member._id,
      meetingStatus: member.meetingStatus,
    }))
  }
}, { immediate: true })

useDraggable(listARef, listA, {
  animation: 150,
  ghostClass: 'ghost',
  group: 'people',
  onUpdate: (evt) => {
    console.log('Updated list1:', evt.newIndex, evt.oldIndex)
  },
  onAdd: (evt) => {
    console.log('Added to list1:', evt.item)
    listA.value = listA.value.map((item, index) => ({
      ...item,
      id: `list1-${index}`,
    }))
  },
  onRemove: (evt) => {
    console.log('Removed from list1:', evt.item)
  },
})

useDraggable(listBRef, listB, {
  animation: 150,
  ghostClass: 'ghost',
  group: 'people',
  onUpdate: (evt) => {
    console.log('Updated list2:', evt.newIndex, evt.oldIndex)
  },
  onAdd: (evt) => {
    console.log('Added to list2:', evt.item)
    listB.value = listB.value.map((item, index) => ({
      ...item,
      id: `list2-${index}`,
    }))
  },
  onRemove: (evt) => {
    console.log('Removed from list2:', evt.item)
  },
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1>A 組</h1>
    <section
      ref="listARef"
      class="flex flex-wrap gap-2 p-4 bg-gray-500/5 rounded overflow-auto"
    >
      <p
        v-for="item in listA"
        :key="item.id"
        class="cursor-move bg-gray-500/5 rounded p-1 text-sm"
      >
        {{ item.name }}
      </p>
    </section>
    <h1>B 組</h1>
    <section
      ref="listBRef"
      class="flex gap-2 p-4 bg-gray-500/5 rounded overflow-auto"
    >
      <p
        v-for="item in listB"
        :key="item.id"
        class="cursor-move bg-gray-500/5 rounded p-1 text-sm"
      >
        {{ item.name }}
      </p>
    </section>
  </div>
</template>
