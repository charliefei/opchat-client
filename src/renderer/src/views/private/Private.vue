<template>
  <main class="h-full w-full font-bold bg-slate-200 dark:bg-[rgb(27,27,27)]">
    <q-splitter
      v-model="splitterModel"
      :separator-style="{width: '0', height: '0'}"
      disable
      class="h-screen"
    >
      <template v-slot:before>
        <header class="h-14 w-[26%] fixed drag">
          <div class="font-bold h-full w-full text-base mt-6 ml-5">私信</div> 
        </header>
        <div class="h-full w-full pt-14">
          <q-scroll-area
            :thumb-style="{
              borderRadius: '5px',
              backgroundColor: '#027be3',
              width: '5px',
              opacity: '0.75',
              height: '5px',
              maxHeight: '30px',
              maxWidth: '30px'
            }"
            class="h-full w-full"
          >
            <q-list>
              <q-item 
                v-for="item in friends" 
                :key="item.user_id" 
                class="q-my-sm" 
                clickable 
                v-ripple
                @click="goToChat(item)"
              >
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white">
                    {{item.nickname[0]}}
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ item.nickname }}</q-item-label>
                  <q-item-label class="text-slate-400" lines="2">{{ item.email }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </div>
      </template>

      <template v-slot:after>
        <router-view></router-view>
        <main v-show="$route.fullPath == '/private'" class="h-full bg-slate-300 dark:bg-[rgb(17,17,17)] dark:text-white overflow-hidden">
        </main>
      </template>
    </q-splitter>
  </main>
</template>

<script setup lang='ts'>
import {onMounted, ref} from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@renderer/store/user'
import FriendApis from '@renderer/api/friend'
import { reqInfoById } from '@renderer/api/user'
const splitterModel = ref(28)
const $router = useRouter()
const $route = useRoute()
const userStore = useUserStore()

const friends = ref<UserInfoType[]>([])

const goToChat = (item: any) => {
  $router.push({
    path: '/private/chat',
    query: {
      id: item.user_id,
      name: item.nickname
    }
  })
}

const getFriendList = async () => {
  const {data: res} = await FriendApis.getFriendList(Number(userStore.userInfo.user_id))
  console.log('@@@', res);
  if (res.data.length > 0) {
    res.data.forEach(async (value) => {
      const {data: res} = await reqInfoById(value.friend_id)
      console.log('info: ', res);
      if(res.data) {
        friends.value.push(res.data)
      }
    })
  }
}

onMounted(() => {
  getFriendList()
})
</script>