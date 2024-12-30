<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import type { TimerState, Task } from './types'
import TaskList from './components/TaskList.vue'

const timerState = ref<TimerState>('idle')
const Time = 60 * 25
const time = ref(Time)
const intervalId = ref<ReturnType<typeof setInterval>>()
const isTaskListVisible = ref(false)

const tasks = ref<Task[]>([
  {
    id: 1,
    content: 'Vue.jsの学習',
    isCompleted: false,
  },
  {
    id: 2,
    content: 'プロジェクトの設計書作成',
    isCompleted: false,
  },
  {
    id: 3,
    content: 'メール返信',
    isCompleted: false,
  },
  {
    id: 4,
    content: 'ランディングページのデザイン作成',
    isCompleted: false,
  },
  {
    id: 5,
    content: 'コードレビュー',
    isCompleted: false,
  },
])

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
    <TaskList v-model:visible="isTaskListVisible" v-model:task-list="tasks" />
  </div>
</template>
