<template>
  <main class="h-full bg-slate-300 dark:bg-[rgb(17,17,17)] dark:text-white overflow-hidden">
    <header class="h-14 border-b border-b-zinc-800 pt-5 pb-2 z-50 drag">
      <div class="flex justify-between items-center px-3">
        <div class="font-bold text-lg no-drag">{{ $route.query.name }}</div>
        <div class="flex w-2/5 justify-evenly items-center dark:text-white no-drag">
          <q-icon name="sms" size="25px"></q-icon>
          <q-icon name="manage_accounts" size="25px"></q-icon>
          <q-icon name="settings_applications" size="25px"></q-icon>
        </div>
      </div>
    </header>
    <section class="h-full w-full">
      <section class="h-full border-r border-r-zinc-800 flex flex-col overflow-hidden">
        <section class="h-3/5 border-b border-b-zinc-800 p-2">
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
            ref="scrollAreaRef"
            class="h-full w-full"
            @scroll="scrollListener"
          >
            <q-chat-message
              v-for="item in messageList"
              :key="item.id"
              :text="[item.content]"
              :stamp="item.stamp"
              :sent="item.self"
              :text-color="item.self ? '': 'white'"
              :bg-color="item.self ? 'amber-7' : 'primary'"
            >
              <template v-if="item.content.includes('blob')" #default>
                <img class="w-32 h-32" :src="item.content" />
              </template>
              <template #avatar>
                <q-avatar size="35px" color="primary" text-color="white" class="mx-2">
                    {{ 
                      item.self ? 
                      (userStore.userInfo.nickname.includes('user') ? userStore.userInfo.nickname.substring(5, 6) : userStore.userInfo.nickname[0]) 
                      : $route.query.name?.toString()[0] 
                    }}
                </q-avatar>
              </template>
              <template #name>
                {{ item.self ? 'me' : $route.query.name }}
              </template>
            </q-chat-message>
          </q-scroll-area>
        </section>
        <section class="h-2/5 px-5 py-1">
          <ul class="flex text-2xl">
            <li class="mr-2">
              <a href="javascript:;" title="emoji">
                <q-icon name="emoji_emotions"/>
                <q-popup-proxy @before-show="showEmojiPicker" class="bg-transparent h-[320px]">
                  <div id="emojiPickerEl"></div>
                </q-popup-proxy>
              </a>
            </li>
            <li>
              <a href="javascript:;" title="图片">
                <label class="cursor-pointer" for="file">
                  <q-icon name="image"/>
                </label>
                <input @change="sendImgMsg" type="file" id="file" class="hidden">
              </a>
            </li>
          </ul>
          <section class="overflow-auto h-full relative">
            <textarea
              v-model="text"
              name="text"
              spellcheck="false"
              id="text"
              rows="7"
              class="w-full outline-none border-none bg-transparent resize-none"
            ></textarea>
            <q-btn @click="sendTextMsg" class="absolute top-24 right-1" color="primary" label="发送" />
          </section>
        </section>
      </section>
    </section>
  </main>
</template>

<script setup lang='ts'>
import data from '@emoji-mart/data'
import { Picker } from 'emoji-mart'
import { QScrollArea } from 'quasar';
import { nextTick, onMounted, ref, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@renderer/store/user'
const $route = useRoute()
const userStore = useUserStore()
const messageList = reactive([
  {
    id: 1,
    self: true,
    content: 'hey, how are you?',
    stamp: new Date('1998/10/21 12:00:00').toLocaleString('zh-CN')
  },
  {
    id: 2,
    content: 'doing fine, how r you?',
    stamp: new Date('1998/10/21 12:10:55').toLocaleString('zh-CN')
  }
])
const text = ref('')

// 滚动条自动触底逻辑
const scrollAreaRef = ref<QScrollArea>()
const scrollToBottom = (duration: number = 0) => {
  scrollAreaRef.value?.setScrollPercentage("vertical", 1, duration)
}
const verticalSize = ref(scrollAreaRef.value?.getScroll().verticalSize)
const scrollListener = info => verticalSize.value = info.verticalSize
watch(() => verticalSize.value, () => scrollToBottom())

// 发送base64图片消息
const sendImgMsg = (e) => {
  const url = URL.createObjectURL(e.target.files[0])
  console.log(url);
  messageList.push({
    id: 4,
    self: true,
    content: url,
    stamp: new Date().toLocaleString('zh-CN')
  })
}

// 发送文本消息
const sendTextMsg = () => {
  console.log(text.value);
  if(text.value !== '') {
    messageList.push({
      id: 3,
      self: true,
      content: text.value,
      stamp: new Date().toLocaleString('zh-CN')
    })
    text.value = ''
  }
}

// 展示emoji表情列表
const showEmojiPicker = async () => {
  await nextTick();
  const emojiPickerEl = document.getElementById('emojiPickerEl')
  const picker = new Picker({ 
    data,
    locale: 'zh',
    previewPosition: 'none',
    skinTonePosition: 'search',
    onEmojiSelect: (e) => {
      console.log(e);
      text.value = text.value.concat(e.native)
    }
  })
  // @ts-ignore
  emojiPickerEl?.appendChild(picker)
}

onMounted(() => {
  scrollToBottom()
})
</script>