<!-- eslint-disable no-console -->
<script setup lang="ts">
import { ref } from 'vue'
import { vDraggable } from 'vue-draggable-plus'

definePageMeta({
  layout: 'dashboard',
})

const state = ref({
  data: [
    {
      name: 'A',
      list: [
        {
          name: 'Joao',
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
      ],
    },
    {
      name: 'B',
      list: [
        {
          name: 'Joao',
          id: '1',
        },
      ],
    },
  ],
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
    <div class="flex">
      <div
        v-for="(item, index) in state.data"
        :key="index"
      >
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
          class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded overflow-auto"
        >
          <div
            v-for="card in item.list"
            :key="card.id"
            class="h-30 bg-gray-500/5 rounded p-3"
          >
            {{ card.name }}
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
