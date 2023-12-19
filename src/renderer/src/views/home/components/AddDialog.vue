<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card :dark="isDarkMode" class="h-[500px] w-[400px]">
      <q-bar class="bg-transparent" v-if="platform === 'darwin'">
        <q-btn dense flat round icon="lens" size="8.5px" color="red" v-close-popup />
        <q-btn dense flat round icon="lens" size="8.5px" />
        <q-btn dense flat round icon="lens" size="8.5px" />
        <div class="col pl-20 text-[8px]">
          加好友/群
        </div>
      </q-bar>
      <hr class="border-zinc-700" />
      <q-card-section>
        <div>
          <q-input filled :dark="isDarkMode" bottom-slots v-model="keyword" label="用户昵称/邮箱号" counter maxlength="12" dense>
            <template v-slot:append>
              <q-icon v-if="keyword !== ''" name="close" @click="keyword = ''" class="cursor-pointer" />
              <q-icon class="cursor-pointer" name="search" @click="searchUser" />
            </template>
          </q-input>
        </div>
      </q-card-section>
      <q-card-section>
        <q-list bordered separator>
          <q-item clickable v-ripple v-for="item in searchUserList" :key="item.user_id">
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                {{ item.nickname[0] }}
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ item.nickname }}</q-item-label>
              <q-item-label caption>{{ item.email }}</q-item-label>
            </q-item-section>
            <q-btn style="width: 16px;height: 16px;" color="primary" icon="add" />
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang='ts'>
import { QDialog } from 'quasar';
import { onMounted, ref } from 'vue'
import { reqInfo } from '@renderer/api/user'
import { useDarkMode } from '@renderer/hooks'
const { isDarkMode, darkModeWatcher } = useDarkMode()
const dialogRef = ref<QDialog>()
defineExpose({
  dialogRef,
})
const keyword = ref('')
const platform = ref('')
const searchUserList = ref<UserItem[]>([])
const searchUser = () => {
  reqInfo(keyword.value)
    .then(({ data: res }) => {
      console.log(res);
      searchUserList.value = res.data
    })
}

onMounted(() => {
  platform.value = window.electron.process.platform
  darkModeWatcher()
})
</script>