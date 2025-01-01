<script setup lang="ts">
import type { Task } from '@/types'
import { ref } from 'vue'

const isTaskListVisible = defineModel<boolean>('visible')
const taskList = defineModel<Task[]>('taskList')
const newTaskContent = ref<string>('')
const emit = defineEmits(['add-task', 'update-task-order'])
const addTask = () => {
  emit('add-task', newTaskContent.value)
  newTaskContent.value = ''
}
const onRowReorder = (event: { value: Task[] }) => {
  emit('update-task-order', event.value)
}
</script>

<template>
  <Drawer
    v-model:visible="isTaskListVisible"
    header="Task List"
    position="right"
    class="!w-[460px]"
  >
    <DataTable :value="taskList" :reorderableColumns="true" @rowReorder="onRowReorder">
      <Column rowReorder :reorderableColumn="false" headerStyle="width: 3rem"></Column>
      <Column field="isCompleted" header="Completed" />
      <Column field="content" header="Task" />
    </DataTable>
    <IconField>
      <InputIcon class="pi pi-plus" />
      <InputText v-model="newTaskContent" placeholder="Add task" @keydown.enter="addTask" />
    </IconField>
  </Drawer>
</template>
