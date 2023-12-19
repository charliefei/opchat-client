<template>
  <div class="relative h-full w-full">
    <div class="text-center">
      <label for="msg">留言</label><br />
      <input
        autofocus
        type="text" 
        id="msg" 
        class="mt-1 p-1 w-full outline-none rounded dark:bg-gray-700" 
        v-model="msg"
      />
    </div>
    <div class="absolute bottom-0 right-0">
      <q-btn @click="add" color="primary" padding="5px" dense label="发送申请" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const msg = ref<string>('')
const add = async () => {
  // ...
}
</script>
