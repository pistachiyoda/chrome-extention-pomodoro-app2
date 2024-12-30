<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import type { TimerState, Task } from './types'
import TaskList from './components/TaskList.vue'

const timerState = ref<TimerState>('idle')
const Time = 60 * 25
const time = ref(Time)
const intervalId = ref<ReturnType<typeof setInterval>>()
const isTaskListVisible = ref(false)

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

const addTask = (newTaskContent: string) => {
  const newTask = {
    id: Date.now(),
    content: newTaskContent,
    isCompleted: false,
  }
  taskList.value.push(newTask)
  try {
    localStorage.setItem('taskList', JSON.stringify(taskList.value))
  } catch (error) {
    console.error(error)
  }
}

const startTimer = () => {
  timerState.value = 'running'
  intervalId.value = setInterval(() => {
    time.value--
    if (time.value === 0) {
      clearInterval(intervalId.value)
      timerState.value = 'finished'
    }
  }, 1000)
}

const reStartTimer = () => {
  time.value = Time
  startTimer()
}

const stopTimer = () => {
  clearInterval(intervalId.value)
  timerState.value = 'paused'
}

onUnmounted(() => {
  clearInterval(intervalId.value)
})
</script>
<template>
  <div class="m-2">
    <div class="w-full flex justify-end">
      <Button icon="pi pi-list" @click="isTaskListVisible = true" />
    </div>
    <div class="flex flex-col gap-2 justify-center items-center">
      <div class="text-4xl">
        {{ String(Math.floor(time / 60)).padStart(2, '0') }}:{{
          String(time % 60).padStart(2, '0')
        }}
      </div>
      <Button v-if="timerState == 'idle'" label="Start" @click="startTimer"></Button>
      <Button
        v-if="timerState == 'running'"
        label="Stop"
        @click="stopTimer"
        class="bg-red-600 border-red-600"
      ></Button>
      <Button
        v-if="timerState == 'paused'"
        label="Resume"
        @click="startTimer"
        class="bg-sky-600"
      ></Button>
      <Button v-if="timerState == 'finished'" label="Restart" @click="reStartTimer"></Button>
    </div>
    <TaskList
      v-model:visible="isTaskListVisible"
      v-model:task-list="taskList"
      @add-task="addTask"
    />
  </div>
</template>
