<script setup lang="ts">
import { ref } from 'vue'

const visibleRight = ref(false)
</script>
<template>
  <div class="m-2">
    <div class="w-full flex justify-end">
      <Button icon="pi pi-list" @click="visibleRight = true" />
    </div>
    <Drawer v-model:visible="visibleRight" header="Task List" position="right">
      <p>sample</p>
    </Drawer>
  </div>
</template>
