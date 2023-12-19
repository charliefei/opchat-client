<template>
  <div v-show="toggleView">
    <q-input
      :dark="darkMode"
      ref="emailRef"
      v-model="formData.email"
      label="邮箱账号 *"
      hint="请填写您的邮箱账号"
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0) || '邮箱账号不可为空！',
        (val) => /[\w]+@[A-Za-z]+(\.[A-Za-z0-9]+){1,2}/.test(val) || '请输入正确的邮箱！'
      ]"
    />
    <q-checkbox
      :dark="darkMode"
      v-model="isPolicyChecked"
      label="我已阅读并同意 服务协议 和 隐私政策"
      class="mt-4"
    />
    <q-checkbox :dark="darkMode" v-model="isAutoLogin" label="30 天内自动登录" />
    <div>
      <q-btn
        label="发送验证码"
        type="submit"
        color="primary"
        rounded
        style="width: 100%"
        class="absolute bottom-10"
        @click="sendCode"
      />
      <q-separator inset />
      <div class="text-center text-blue text-sm mt-9">
        <a href="https://programmercharlie.github.io">访问CharlieFei的博客💗</a>
      </div>
    </div>
  </div>
  <div v-show="!toggleView">
    <div>
      <div class="text-xl font-bold">输入邮箱验证码</div>
      <span class="text-gray-400">
        请输入发送至 {{ formData.email }} 的 6 位验证码，有效期 10 分钟
      </span>
    </div>
    <q-input
      :dark="darkMode"
      v-model="formData.code"
      label="验证码 *"
      hint="请输入验证码"
      :dense="false"
    >
      <template v-slot:append>
        <span>{{ countDown }}</span>
      </template>
    </q-input>
    <q-input
      :dark="darkMode"
      v-model="formData.password"
      label="密码 *"
      hint="请输入密码"
      :dense="false"
    />
    <div class="text-blue cursor-pointer mt-3" @click="reSendCode">重新获取验证码</div>
    <div>
      <q-btn
        :disable="formData.code.length >= 6 ? false : true"
        label="注册"
        type="submit"
        color="primary"
        rounded
        style="width: 100%"
        class="absolute bottom-10"
        @click="register"
      />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref, onUnmounted } from 'vue';
import { useQuasar } from 'quasar'
import { useCountDown } from "@renderer/hooks/index";
// @ts-ignore
import { sendCaptcha, reqRegister } from '@renderer/api/user'
// @ts-ignore
import { useUserStore } from '@renderer/store/user'
defineProps<{
  modelValue: string
  darkMode: boolean
}>()
const $emits = defineEmits(['update:modelValue'])
const $q = useQuasar()
const toggleView = ref(true)
const {countDown, doCountDown, stopCountDown} = useCountDown(60)
const userStore = useUserStore()

const formData = reactive({
  email: '',
  code: '',
  password: ''
})
const emailRef = ref()
const isPolicyChecked = ref(false)
const isAutoLogin = ref(false)

const sendCode = async () => {
  emailRef.value.validate()
  if(emailRef.value.hasError) {
    formData.email = ''
    emailRef.value.focus()
    return
  }

  if(isPolicyChecked.value !== true) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: '您需要勾选同意服务协议和隐私政策后继续！'
    })
  } else {
    // ... 发请求
    const {data:res} = await sendCaptcha(formData.email)
    console.log(res);
    toggleView.value = false
    doCountDown()
  }
}

const reSendCode = () => {
  if(countDown.value == 60) {
    doCountDown()
  }
}

const register = async () => {
  const {data:res} = await reqRegister({
    email: formData.email,
    captcha: formData.code,
    nickname: formData.email.substring(0, formData.email.indexOf('@')),
    password: formData.password
  })
  console.log(res);
  userStore.uid = res.data
  $emits('update:modelValue', 'login')
}

onUnmounted(() => {
  stopCountDown()
})
</script>
