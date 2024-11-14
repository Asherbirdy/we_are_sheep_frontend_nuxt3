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
  _id: string
  meetingStatus: string
}

// List
const listA = ref<DraggableItem[]>([])
const listB = ref<DraggableItem[]>([])
const listC = ref<DraggableItem[]>([])
const listD = ref<DraggableItem[]>([])
const listE = ref<DraggableItem[]>([])

// Template Ref
const listARef = ref<HTMLElement | null>(null)
const listBRef = ref<HTMLElement | null>(null)
const listCRef = ref<HTMLElement | null>(null)
const listDRef = ref<HTMLElement | null>(null)
const listERef = ref<HTMLElement | null>(null)

const mapMembersToList = (members: DraggableItem[]) => members.map(member => ({
  name: member.name,
  id: member._id,
  meetingStatus: member.meetingStatus,
}))

const groups = ['A', 'B', 'C', 'D', 'E']
const lists = [listA, listB, listC, listD, listE]

watch(data, (newData) => {
  if (newData?.members) {
    groups.forEach((group, index) => {
      lists[index].value = mapMembersToList(newData.members[group])
    })
  }
}, { immediate: true })

const draggableFunction = (
  list: Ref<DraggableItem[]>,
  templateRef: Ref<HTMLElement | null>,
) => {
  useDraggable(templateRef, list, {
    animation: 150,
    ghostClass: 'ghost',
    group: 'people',
    onUpdate: (evt) => {
      console.log('Updated list1:', evt.newIndex, evt.oldIndex)
    },
    onAdd: (evt) => {
      console.log('Added to list1:', evt.item)
      list.value = list.value.map((item, index) => ({
        ...item,
        id: `list1-${index}`,
      }))
    },
    onRemove: (evt) => {
      console.log('Removed from list1:', evt.item)
    },
  })
}

// 建立拖曳功能
draggableFunction(listA, listARef)
draggableFunction(listB, listBRef)
draggableFunction(listC, listCRef)
draggableFunction(listD, listDRef)
draggableFunction(listE, listERef)
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
        :key="item._id"
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
        :key="item._id"
        class="cursor-move bg-gray-500/5 rounded p-1 text-sm"
      >
        {{ item.name }}
      </p>
    </section>
    <h1>C 組</h1>
    <section
      ref="listCRef"
      class="flex gap-2 p-4 bg-gray-500/5 rounded overflow-auto"
    >
      <p
        v-for="item in listC"
        :key="item.id"
        class="cursor-move bg-gray-500/5 rounded p-1 text-sm"
      >
        {{ item.name }}
      </p>
    </section>
    <h1>D 組</h1>
    <section
      ref="listDRef"
      class="flex gap-2 p-4 bg-gray-500/5 rounded overflow-auto"
    >
      <p
        v-for="item in listD"
        :key="item.id"
        class="cursor-move bg-gray-500/5 rounded p-1 text-sm"
      >
        {{ item.name }}
      </p>
    </section>
    <h1>E 組</h1>
    <section
      ref="listERef"
      class="flex gap-2 p-4 bg-gray-500/5 rounded overflow-auto"
    >
      <p
        v-for="item in listE"
        :key="item.id"
        class="cursor-move bg-gray-500/5 rounded p-1 text-sm"
      >
        {{ item.name }}
      </p>
    </section>
  </div>
</template>
