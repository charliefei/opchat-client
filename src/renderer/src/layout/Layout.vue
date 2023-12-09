<template>
  <div class="h-screen w-screen dark:text-white">
    <q-splitter
      v-model="splitterModel"
      unit="px"
      :separator-style="{width: '0'}"
      disable 
      class="h-screen">
      <template v-slot:before>
        <q-tabs vertical class="relative text-slate-500 dark:text-gray-200 bg-slate-200/80 dark:bg-zinc-800/80 pt-[50px] drag">
          <q-avatar color="primary" text-color="white" size="32px" class="ml-4 mb-5 cursor-pointer no-drag">
            <!-- <img src="https://cdn.quasar.dev/img/avatar.png"> -->
            {{ userStore.userInfo.nickname.includes('user') ?
              userStore.userInfo.nickname.substring(5, 6) : userStore.userInfo.nickname[0]
            }}
            <q-menu :dark="isDarkMode" :target="true" anchor="bottom right">
              <div class="row no-wrap q-pa-md">
                <div class="column items-center">
                  <q-avatar size="72px" color="primary" text-color="white">
                    <!-- <img src="https://cdn.quasar.dev/img/avatar.png"> -->
                    {{ userStore.userInfo.nickname.includes('user') ?
                      userStore.userInfo.nickname.substring(5, 6) : userStore.userInfo.nickname[0]
                    }}
                  </q-avatar>
                  <div class="text-subtitle1 q-mt-md q-mb-xs">{{ userStore.userInfo.nickname }}</div>
                  <q-btn
                    color="primary"
                    label="Logout"
                    push
                    size="sm"
                    v-close-popup
                  />
                </div>
              </div>
            </q-menu>
          </q-avatar>
          <q-route-tab
            v-for="(item, index) in tabs"
            :key="index"
            :to="item.to" 
            :icon="item.icon"
            class="no-drag"
          />
          <div>
            <div 
              class="py-2 flex flex-col items-center justify-center my-4 no-drag cursor-pointer hover:bg-zinc-200/20 dark:hover:bg-slate-200/20"
              v-for="item in guildList"
              :key="item.guild_id"
              @click="gotoChat(item)"
            >
              <q-avatar color="primary" text-color="white" rounded size="32px">
                <!-- <img :src="item.img"> -->
                {{ item.guild_name[0] }}
              </q-avatar>
            </div>
          </div>
        </q-tabs>
      </template>

      <template v-slot:after>
        <router-view></router-view>
      </template>
    </q-splitter>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useUserStore } from '@renderer/store/user'
import { useDarkMode } from '@renderer/hooks/index'
const $router = useRouter()
const userStore = useUserStore()
const splitterModel = ref(62)
const tabs = [
  {
    to: '/home',
    icon: 'other_houses',
  },
  {
    to: '/private',
    icon: 'email'
  }
]
const guildList = ref([
  {
    guild_id: '1',
    guild_name: 'We Are The Only.',
  },
  {
    guild_id: '2',
    guild_name: 'Genshin Impact',
  }
])
const gotoChat = (guild: any) => {
  $router.push({
    path: '/guild',
    query: {
      id: guild.guild_id,
      name: guild.guild_name,
    }
  })
}

const { isDarkMode, darkModeWatcher } = useDarkMode()
onMounted(() => {
  darkModeWatcher()
})
</script>
