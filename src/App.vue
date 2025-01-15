<script setup lang="ts">
import { ref, onUnmounted, computed } from 'vue'
import type { TimerState } from './types'
import TaskList from './components/TaskList.vue'
import { getStoredTaskList } from '@/utils'
import type { Task } from '@/types'

const timerState = ref<TimerState>('idle')
const Time = 60 * 25
const time = ref(Time)
const intervalId = ref<ReturnType<typeof setInterval>>()
const isTaskListVisible = ref(false)
const taskList = ref<Task[]>(getStoredTaskList())
const tomatos = computed(() => {
  return taskList.value.reduce((acc, task) => {
    return acc + task.plan
  }, 0)
})
const currentTask = computed(() => taskList.value.find((task) => task.isInProgress))

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
  <div class="my-3 mx-4">
    <div class="w-full flex justify-end">
      <div class="pi pi-list text-3xl cursor-pointer" @click="isTaskListVisible = true"></div>
    </div>
    <div class="flex flex-col gap-2 justify-center items-center">
      <div class="flex">
        <img
          v-for="tomato in tomatos"
          :key="tomato"
          src="/tomato.png"
          alt="Planed Tomato"
          class="w-5 cursor-pointer"
        />
      </div>
      <p class="text-4xl">
        {{ currentTask.content }}
      </p>
      <div class="text-4xl">
        {{ String(Math.floor(time / 60)).padStart(2, '0') }}:{{
          String(time % 60).padStart(2, '0')
        }}
      </div>
      <div class="flex">
        <img
          v-for="tomato in currentTask.plan"
          :key="tomato"
          src="/tomato.png"
          alt="Planed Tomato"
          class="w-5 cursor-pointer"
        />
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
    <TaskList v-model:visible="isTaskListVisible" />
  </div>
</template>
