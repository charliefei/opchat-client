<template>
  <div
    class="flex flex-col h-screen w-screen bg-slate-200 dark:bg-[rgb(27,27,27)] dark:text-white drag"
  >
    <header
      class="drag w-full h-7 flex justify-center items-center border-b border-b-[#e9e9e9] text-[14px] font-bold text-[#505050] dark:text-white"
    >
      添加好友
    </header>
    <main class="no-drag h-[372px]">
      <div v-if="toggleView" class="h-full w-full p-3">
        <div>
          <q-input :dark="isDarkMode" outlined hide-bottom-space v-model="keyword" dense>
            <template v-slot:append>
              <q-icon
                v-if="keyword !== ''"
                name="close"
                @click="keyword = ''"
                class="cursor-pointer"
              />
              <q-icon @click="search" name="search" class="cursor-pointer" />
            </template>
          </q-input>
        </div>
        <div class="mt-3">
          <div class="overflow-auto h-[calc(6*50px)]">
            <div
              v-for="item in searchList"
              :key="item.user_id"
              class="flex justify-between items-center mb-3"
            >
              <div class="flex justify-center items-center">
                <q-avatar color="primary" size="36px" text-color="white">
                  <img :src="item.avatar" />
                </q-avatar>
                <div class="flex flex-col justify-center ml-2">
                  <span>{{ item.nickname }}</span>
                  <span class="text-xs text-blue-500">{{ item.email }}</span>
                </div>
              </div>
              <div v-show="!item.isFriend && item.user_id !== userStore.userInfo.user_id">
                <q-btn
                  color="primary"
                  dense
                  icon-right="add"
                  @click="addHandler(item.user_id)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="h-full w-full p-3">
        <AddMessageBox />
      </div>
    </main>
  </div>
</template>

<script setup lang='ts'>
import { useDarkMode } from '@renderer/hooks'
import { onMounted, ref } from 'vue'
import AddMessageBox from './components/AddMessageBox.vue'
import { useUserStore } from "@renderer/store/user";
import { reqInfo } from '@renderer/api/user'

const userStore = useUserStore()
const { isDarkMode, darkModeWatcher } = useDarkMode()
const keyword = ref<string>('')
const searchList = ref<Array<UserItem & {isFriend: boolean}>>([
  {
    user_id: 1,
    nickname: '张三',
    avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
    email: 'zhangsan@qq.com',
    isFriend: false
  }
])
const toggleView = ref<boolean>(true)

const search = async () => {
  if (keyword.value.trim().length === 0) return
  reqInfo(keyword.value)
    .then(({ data: res }) => {
      console.log(res);
      res.data.forEach(val => {
        searchList.value.push({
          ...val,
          isFriend: false
        })
      })
    })
}

const addHandler = (targetUid: number) => {
  toggleView.value = false
  console.log(targetUid);
}

onMounted(() => {
  darkModeWatcher()
})
</script>

<style scoped lang=''>

</style>