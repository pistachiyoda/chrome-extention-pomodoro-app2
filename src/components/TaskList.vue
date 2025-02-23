<script setup lang="ts">
import type { Task } from '@/types'
import { ref } from 'vue'
import { getStoredTaskList } from '@/utils'
import type { DataTableCellEditCompleteEvent } from 'primevue'

const isTaskListVisible = defineModel<boolean>('visible')
const newTaskContent = ref<string>('')

const taskList = ref<Task[]>(getStoredTaskList())

const addTask = () => {
  const newTask = {
    id: Date.now(),
    isCompleted: false,
    isInProgress: false,
    content: newTaskContent.value,
    plan: 1,
    actual: 1,
  }
  if (taskList.value.length === 0) {
    newTask.isInProgress = true
  }
  taskList.value.push(newTask)
  try {
    localStorage.setItem('taskList', JSON.stringify(taskList.value))
  } catch (error) {
    console.error(error)
  }
  newTaskContent.value = ''
}
const updateTaskList = (newTaskList: Task[]) => {
  taskList.value = newTaskList
  try {
    localStorage.setItem('taskList', JSON.stringify(taskList.value))
  } catch (error) {
    console.error(error)
  }
}

const setInprogressTask = (taskList: Task[]) => {
  const i = taskList.findIndex((task) => task.isCompleted === false)
  if (i === -1) {
    alert('All tasks are completed!')
    return
  }
  taskList[i].isInProgress = true
}

const updateStatus = (task: Task) => {
  const newTaskList = taskList.value.map((t) => {
    if (t.id === task.id) {
      return { ...t, isCompleted: task.isCompleted, isInProgress: false }
    }
    return t
  })
  setInprogressTask(newTaskList)
  updateTaskList(newTaskList)
}

const onRowReorder = (event: { value: Task[] }) => {
  updateTaskList(event.value)
}

const onCellEditComplete = (event: DataTableCellEditCompleteEvent) => {
  console.log(event)
  const newTaskList = taskList.value.map((t) => {
    if (t.id === event.data.id) {
      return { ...t, content: event.newValue }
    }
    return t
  })

  updateTaskList(newTaskList)
}

const deleteTask = (task: Task) => {
  const newTaskList = taskList.value.filter((t) => t.id !== task.id)
  updateTaskList(newTaskList)
}
</script>

<template>
  <Drawer
    v-model:visible="isTaskListVisible"
    header="Task List"
    position="right"
    class="!w-[460px]"
  >
    <DataTable
      :value="taskList"
      :reorderableColumns="true"
      @rowReorder="onRowReorder"
      editMode="cell"
      @cell-edit-complete="onCellEditComplete"
      class="mb-3"
    >
      <Column rowReorder :reorderableColumn="false" class=""></Column>
      <Column field="Completed" class="">
        <template #body="slotProps">
          <Checkbox
            v-model="slotProps.data.isCompleted"
            binary
            @change="updateStatus(slotProps.data)"
          />
        </template>
      </Column>
      <Column field="content" class="w-72 text-sm">
        <template #editor="{ data }">
          <InputText v-model="data.content" class="w-40" />
        </template>
      </Column>

      <Column field="Completed" class="">
        <template #body="slotProps">
          <span class="pi pi-trash cursor-pointer" @click="deleteTask(slotProps.data)"></span>
        </template>
      </Column>
    </DataTable>
    <IconField>
      <InputIcon class="pi pi-plus" />
      <InputText v-model="newTaskContent" placeholder="Add task" @keydown.enter="addTask" />
    </IconField>
  </Drawer>
</template>
