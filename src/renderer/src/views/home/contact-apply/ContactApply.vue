<template>
  <header class="h-14 p-4 font-bold text-base drag">
    <span class="no-drag">待处理的好友/群请求</span>
  </header>
  <main class="p-6">
    <div class="overflow-auto h-[620px] w-full">
      <div v-for="item in applyList" :key="item.applyId" class="rounded-lg mb-4 bg-gray-400 dark:bg-[#262626] flex justify-between items-center p-4">
        <div class="flex justify-between items-center">
          <q-avatar color="primary" size="36px" text-color="white">
            <img :src="item.avatar" />
          </q-avatar>
          <div class="flex flex-col justify-center ml-4 font-xm">
            <span>
              <span class="text-blue-500 cursor-pointer">{{ item.name }}</span> 请求添加你为好友 <span class="text-gray-500 ml-1">{{ item.applyTime }}</span>
            </span>
            <span class="font-xm text-gray-500 mt-1">留言: {{ item.msg }}</span>
          </div>
        </div>
        <div v-show="item.status === 1">
          <q-btn color="primary" outline label="同意" />
        </div>
        <div v-show="item.status === 2">
          <span>对方已同意</span>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang='ts'>
import { ref } from 'vue';

const applyList = ref([
  {
    applyId: 1,
    avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
    name: 'feirui',
    msg: '你好',
    status: 2,
    applyTime: new Date('2023/12/18 20:20:51').toLocaleString('zh-CN')
  },
  {
    applyId: 2,
    avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
    name: 'trualy',
    msg: '你好...',
    status: 1,
    applyTime: new Date('2023/12/19 20:10:51').toLocaleString('zh-CN')
  },
  {
    applyId: 3,
    avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
    name: 'admin',
    msg: '你好',
    status: 1,
    applyTime: new Date('2023/12/19 20:01:51').toLocaleString('zh-CN')
  }
])
</script>
