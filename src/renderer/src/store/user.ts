import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const uid = ref(0)
  const userInfo = ref({
    avatar: '',
    email: '',
    nickname: '',
    user_id: '',
    sex: ''
  })
  const token = ref('')
  const userLogin = (data: any) => {
    userInfo.value = data[0]
    token.value = data[0].token
    localStorage.setItem('token', token.value)
  }

  return { uid, userInfo, token, userLogin }
}, {
  persist: {
    paths: ['userInfo']
  }
})