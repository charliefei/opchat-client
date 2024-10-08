<template>
  <main class="h-full bg-slate-300 dark:bg-[rgb(17,17,17)] dark:text-white overflow-hidden">
    <header class="h-14 border-b border-b-zinc-800 pt-5 pb-2 z-50 drag">
      <div class="flex justify-between items-center px-3">
        <div class="font-bold text-lg no-drag">{{ $route.query.name }}</div>
        <div class="flex gap-4 items-center dark:text-white no-drag">
          <q-icon class="cursor-pointer" name="o_featured_video" size="25px"></q-icon>
          <q-icon class="cursor-pointer" name="o_video_camera_front" size="25px"></q-icon>
          <q-icon class="cursor-pointer" name="o_settings" size="25px"></q-icon>
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
              v-for="item in computedMessageList"
              :key="item.id"
              :text="[item.content]"
              :stamp="item.stamp?.toString()"
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
                <q-icon name="o_emoji_emotions"/>
                <q-popup-proxy @before-show="showEmojiPicker" class="bg-transparent h-[320px]">
                  <div id="emojiPickerEl"></div>
                </q-popup-proxy>
              </a>
            </li>
            <li>
              <a href="javascript:;" title="图片">
                <label class="cursor-pointer" for="file">
                  <q-icon name="o_image"/>
                </label>
                <input type="file" id="file" class="hidden">
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
import { nextTick, onMounted, ref, reactive, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@renderer/store/user'
import { useMessageStore } from '@renderer/store/message'
import MsgApis from "@renderer/api/msg";
const $route = useRoute()
const userStore = useUserStore()
const messageStore = useMessageStore()

type MessageType = {
  id: number,
  self: boolean,
  content: any,
  stamp?: number | string
}
const messageList = reactive<MessageType[]>([])
const computedMessageList = computed(() => {
  return messageList.reduce((acc, cur) => {
    const isDuplicate = acc.some(item => item.id === cur.id)
    if(!isDuplicate) {
      acc.push(cur)
    }
    return acc
  }, [] as MessageType[])
})
const text = ref('')

// 滚动条自动触底逻辑
const scrollAreaRef = ref<QScrollArea>()
const scrollToBottom = (duration: number = 0) => {
  scrollAreaRef.value?.setScrollPercentage("vertical", 1, duration)
}
const verticalSize = ref(scrollAreaRef.value?.getScroll().verticalSize)
const scrollListener = info => verticalSize.value = info.verticalSize
watch(() => verticalSize.value, () => scrollToBottom())

const getMsgList = () => {
  messageStore.getMsgListLocal().then(value => {
    value.forEach(msg => {
      messageList.push({
        id: msg.msg_id,
        self: msg.msg_sender === userStore.userInfo.user_id,
        content: msg.msg_content,
        stamp: new Date(Number(msg.msg_timestamp)).toLocaleString('zh-CN')
      })
    })
  })
}

// 发送文本消息
const sendTextMsg = async () => {
  console.log(userStore.userInfo.nickname + "发送：", text.value);
  if(text.value !== '') {
    MsgApis.sendPrivateMessage({
      msg_sender: userStore.userInfo.user_id,
      msg_receiver: Number($route.query.id),
      msg_type: 'text',
      msg_content: text.value
    })
    text.value = ''
  }
}

messageStore.$subscribe(async () => {
  await getMsgList()
})

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
      // console.log(e);
      text.value = text.value.concat(e.native)
    }
  })
  // @ts-ignore
  emojiPickerEl?.appendChild(picker)
}

onMounted(async () => {
  // 刷新消息
  await getMsgList()
  // 获取未读消息
  messageStore.getUnreadMsgList(userStore.userInfo.user_id)
  .then(async value => {
    if(value && value.length !== 0) {
      await messageStore.saveBatchMsgToLocal(value)
      // 刷新消息
      await getMsgList()
    }
  })
  scrollToBottom()
})
</script>