<script setup lang="ts">
import type { TimerState } from './types'
import { ref, onUnmounted } from 'vue'

const timerState = ref<TimerState>('idle')
const Time = 60 * 25
const time = ref(Time)
const intervalId = ref<ReturnType<typeof setInterval>>()

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

const visibleRight = ref(false)
</script>
<template>
  <div class="m-2">
    <div class="w-full flex justify-end">
      <Button icon="pi pi-list" @click="visibleRight = true" />
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
    <Drawer v-model:visible="visibleRight" header="Task List" position="right">
      <p>sample</p>
    </Drawer>
  </div>
</template>
