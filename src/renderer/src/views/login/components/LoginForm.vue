<template>
  <q-form @submit="onSubmit">
    <q-input
      :dark="darkMode"
      v-model="formData.email"
      label="邮箱账号 *"
      hint="请填写您的邮箱账号"
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0) || '邮箱账号不可为空！',
        (val) => /[\w]+@[A-Za-z]+(\.[A-Za-z0-9]+){1,2}/.test(val) || '请输入正确的邮箱！'
      ]"
    />
    <q-input
      :dark="darkMode"
      v-model="formData.password"
      label="密码 *"
      :type="isPwd ? 'password' : 'text'"
      hint="请填写您的密码"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || '密码不可为空！']"
    >
      <template v-slot:append>
        <q-icon
          :name="formData.password.length != 0 ? (isPwd ? 'o_visibility' : 'o_visibility_off') : ''"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <q-checkbox
      :dark="darkMode"
      v-model="accept"
      label="我已阅读并同意 服务协议 和 隐私政策"
      class="mt-4"
    />
    <div>
      <q-btn
        :loading="loading"
        label="登录"
        type="submit"
        color="primary"
        rounded
        style="width: 100%"
        class="mt-5"
      />
    </div>
  </q-form>
</template>

<script setup lang='ts'>
import {reactive, ref} from 'vue'
import {useRouter} from "vue-router";
import {useQuasar} from "quasar";
import {reqLogin} from '@renderer/api/user'
import {useUserStore} from '@renderer/store/user'
defineProps<{
  darkMode: boolean
}>()
const $q = useQuasar()
const userStore = useUserStore()
const $router = useRouter()
const formData = reactive({
  email: '',
  password: '',
  type: 'email',
})
const accept = ref(false)
const isPwd = ref(true)
const loading = ref(false)

const onSubmit = async () => {
  loading.value = true
  if(accept.value !== true) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: '您需要同意服务协议和隐私政策后继续！'
    })
  } else {
    console.log(formData);
    const {data: res} = await reqLogin(formData)
    console.log(res);
    userStore.userLogin(res.data)
    loading.value = false
    $router.push('/')
  }
}
</script>
