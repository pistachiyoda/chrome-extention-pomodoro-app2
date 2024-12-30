<script setup lang="ts">
import type { Task } from '@/types'
import { ref } from 'vue'

const isTaskListVisible = defineModel<boolean>('visible')
const taskList = defineModel<Task[]>('taskList')
const newTaskContent = ref<string>('')
const emit = defineEmits(['addTask'])
const addTask = () => {
  emit('addTask', newTaskContent.value)
  newTaskContent.value = ''
}
</script>

<template>
  <Drawer
    v-model:visible="isTaskListVisible"
    header="Task List"
    position="right"
    class="!w-[460px]"
  >
    <table class="border-separate border-spacing-x-2 border-spacing-y-1">
      <thead>
        <tr>
          <th aria-label="Completed"></th>
          <th aria-label="Task"></th>
          <th>Plan</th>
          <th>Actual</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in taskList" :key="task.id">
          <td>
            <input type="checkbox" :checked="task.isCompleted" disabled />
          </td>
          <td class="w-72">{{ task.content }}</td>
          <td class="text-center">0</td>
          <td class="text-center">0</td>
        </tr>
      </tbody>
    </table>
    <IconField>
      <InputIcon class="pi pi-plus" />
      <InputText v-model="newTaskContent" placeholder="Add task" @keydown.enter="addTask" />
    </IconField>
  </Drawer>
</template>
