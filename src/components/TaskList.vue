<script setup lang="ts">
import type { Task } from '@/types'
import { ref } from 'vue'

const isTaskListVisible = defineModel<boolean>('visible')
const newTaskContent = ref<string>('')

const getStoredTaskList = (): Task[] => {
  try {
    const stored = localStorage.getItem('taskList')
    if (!stored) return []
    return JSON.parse(stored)
  } catch (error) {
    console.error(error)
    return []
  }
}
const taskList = ref<Task[]>(getStoredTaskList())

const addTask = () => {
  const newTask = {
    id: Date.now(),
    content: newTaskContent.value,
    isCompleted: false,
  }
  taskList.value.push(newTask)
  try {
    localStorage.setItem('taskList', JSON.stringify(taskList.value))
  } catch (error) {
    console.error(error)
  }
  newTaskContent.value = ''
}

const updateTaskOrder = (newTaskList: Task[]) => {
  console.log(newTaskList)
  taskList.value = newTaskList
  try {
    localStorage.setItem('taskList', JSON.stringify(taskList.value))
  } catch (error) {
    console.error(error)
  }
}

const onRowReorder = (event: { value: Task[] }) => {
  updateTaskOrder(event.value)
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
