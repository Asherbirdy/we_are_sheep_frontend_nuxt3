<!-- eslint-disable no-console -->
<script setup lang="ts">
import { useDraggable } from 'vue-draggable-plus'

definePageMeta({
  layout: 'dashboard',
})

interface DraggableItem {
  name: string
  id: string
}

const list1 = ref<DraggableItem[]>([
  {
    name: '王小明',
    id: '1',
  },
  {
    name: 'Jean',
    id: '2',
  },
  {
    name: 'Johanna',
    id: '3',
  },
  {
    name: 'Juan',
    id: '4',
  },
  {
    name: '王小明',
    id: '5',
  },
  {
    name: '王小明',
    id: '6',
  },
  {
    name: '王小明',
    id: '7',
  },
])
const list2 = ref<DraggableItem[]>(
  list1.value.map(item => ({
    name: `${item.name}-2`,
    id: `${item.id}-2`,
  })),
)

const el1 = ref<HTMLElement | null>(null)
const el2 = ref<HTMLElement | null>(null)

useDraggable(el1, list1, {
  animation: 150,
  ghostClass: 'ghost',
  group: 'people',
  onUpdate: (evt) => {
    console.log('Updated list1:', evt.newIndex, evt.oldIndex)
  },
  onAdd: (evt) => {
    console.log('Added to list1:', evt.item)
    list1.value = list1.value.map((item, index) => ({
      ...item,
      id: `list1-${index}`,
    }))
  },
  onRemove: (evt) => {
    console.log('Removed from list1:', evt.item)
  },
})

useDraggable(el2, list2, {
  animation: 150,
  ghostClass: 'ghost',
  group: 'people',
  onUpdate: (evt) => {
    console.log('Updated list2:', evt.newIndex, evt.oldIndex)
  },
  onAdd: (evt) => {
    console.log('Added to list2:', evt.item)
    list2.value = list2.value.map((item, index) => ({
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
    <h1>A</h1>
    <section
      ref="el1"
      class="flex flex-wrap gap-2 p-4 bg-gray-500/5 rounded overflow-auto"
    >
      <p
        v-for="item in list1"
        :key="item.id"
        class="cursor-move bg-gray-500/5 rounded p-1 text-sm"
      >
        {{ item.name }}
      </p>
    </section>
    <h1>B</h1>
    <section
      ref="el2"
      class="flex gap-2 p-4 bg-gray-500/5 rounded overflow-auto"
    >
      <p
        v-for="item in list2"
        :key="item.id"
        class="cursor-move bg-gray-500/5 rounded p-1 text-sm"
      >
        {{ item.name }}
      </p>
    </section>
  </div>
</template>
