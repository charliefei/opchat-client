<template>
  <main class="h-screen w-screen p-8 bg-slate-200 drag">
    <section class="h-full w-full no-drag">
      <q-splitter
        v-model="splitterModel"
        disable
        :separator-style="{width: '0'}"
        class="h-full w-full p-2"
      >
        <template v-slot:before>
          <div class="h-full">
            <q-carousel
              v-model="slide"
              swipeable
              animated
              autoplay
              infinite
              navigation
              padding
              height="100%"
              class="rounded-borders bg-transparent"
            >
              <q-carousel-slide
                v-for="item in slideList"
                :key="item.id"
                class="column no-wrap flex-center"
                :name="item.name"
              >
                <q-icon :name="item.name" size="100px" />
                <div class="q-mt-md text-center">
                  <div class="text-2xl font-bold">{{ item.title }}</div>
                  <span class="text-gray-400 text-lg" v-html="item.detail"></span>
                </div>
              </q-carousel-slide>
            </q-carousel>
          </div>
        </template>

        <template v-slot:after>
          <div class="h-full">
            <div class="bg-white rounded-lg h-[94%] shadow-lg p-9">
              <div class="font-bold font-mono text-2xl mb-9">
                欢迎使用OpChat
              </div>
              <div class="q-gutter-md h-full relative">
                <q-btn-toggle
                  v-model="toggle"
                  spread
                  no-caps
                  rounded
                  unelevated
                  toggle-color="primary"
                  color="white"
                  text-color="primary"
                  :options="options"
                />
                <RegisterForm v-if="toggle === 'register'"/>
                <LoginForm v-else/>
              </div>
            </div>
          </div>
        </template>
      </q-splitter>
      <footer class="w-full flex flex-col justify-center align-center">
        <div class="text-center text-slate-600 font-mono">copyright@feirui 2023</div>
      </footer>
    </section>
  </main>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue';
import RegisterForm from "./components/RegisterForm.vue";
import LoginForm from './components/LoginForm.vue'

const splitterModel = ref(50)
const slide = ref('style')
const slideList = ref([
  {
    id: 1,
    name: 'layers',
    title: '一站式协作',
    detail: '整合即时通讯、音视频会议、云文档<br/>智能日历等功能，打造高效办公方式'
  },
  {
    id: 2,
    name: 'style',
    title: '音视频会议',
    detail: '一键通话，时长不设限<br/>共享屏幕，讨论更无间'
  }
])
const options = reactive([
  {label: '注册', value: 'register'},
  {label: '登录', value: 'login'}
])
const toggle = ref('register')
</script>