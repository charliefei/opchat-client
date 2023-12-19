<template>
  <main class="h-screen w-screen p-8 bg-slate-200 dark:bg-[rgb(27,27,27)] dark:text-white drag">
    <section class="h-full w-full no-drag">
      <q-splitter
        v-model="splitterModel"
        disable
        :separator-style="{ width: '0' }"
        class="h-full w-full p-2"
      >
        <template v-slot:before>
          <div class="h-full left font-mono font-bold">
            <div class="title dark:text-white text-slate-800" v-html="text"></div>
            <div class="desc dark:text-white text-slate-800">关于 <span @click="aboutOPChat">OPChat</span></div>
          </div>
        </template>

        <template v-slot:after>
          <div class="h-full">
            <div class="dark:bg-[rgb(27,27,27)] dark:text-white rounded-lg h-[94%] shadow-lg p-9">
              <div class="font-bold font-mono text-2xl mb-9">欢迎使用OpChat</div>
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
                <RegisterForm
                  :dark-mode="isDarkMode"
                  v-model="toggle"
                  v-if="toggle === 'register'"
                />
                <LoginForm :dark-mode="isDarkMode" v-else />
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

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useDarkMode } from '@renderer/hooks'
import RegisterForm from './components/RegisterForm.vue'
import LoginForm from './components/LoginForm.vue'

const { isDarkMode, darkModeWatcher } = useDarkMode()
const splitterModel = ref(50)
const options = reactive([
  { label: '注册', value: 'register' },
  { label: '登录', value: 'login' }
])
const toggle = ref('register')
let text = ref<string>('')
// 打印机效果
const print = async (printInfo: string) => {
  let printText = printInfo
  for (let i = 0; i < printText.length; i++) {
    let str = printText.slice(i, i + 1)
    if (str === '\n') {
      text.value = text.value + '<br>'
    } else {
      await new Promise((resolve) => {
        setTimeout(() => {
          text.value = text.value + str
          resolve(null)
        }, 80)
      })
    }
  }
  text.value = text.value
}
// 关于
const aboutOPChat = () => {
  //window.api.openAboutDialogWin()
}

defineExpose({
  toggle
})

onMounted(() => {
  print('WELCOME TO\nI LOVE OPCHAT')
  darkModeWatcher()
})
</script>

<style lang="scss">
.left {
  flex: 16;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 30% 0;
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    top: 40%;
    left: 30%;
    width: 280px;
    height: 100px;
    background: linear-gradient(to right, $primary, #c471ed, #f64f59);
    filter: blur(70px);
    transition: all 0.5s;
  }

  &:has(.desc:hover) {
    &::before {
      filter: blur(55px);
    }
  }

  .title {
    width: 100%;
    height: 120px;
    font-size: 40px;
    font-weight: bold;
    z-index: 2;
  }

  .desc {
    font-size: 15px;
    font-weight: bold;
    margin-top: 10px;
    cursor: pointer;
    z-index: 2;

    span {
      color: #5140f0;
      text-decoration: underline wavy;
    }
  }
}
</style>
