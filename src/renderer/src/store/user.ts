import { defineStore } from 'pinia'
import { ref } from 'vue'
import socket from '@renderer/api/ws/websocket'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserLoginResp>({
    user_id: 0,
    token: '',
    nickname: '',
    email: '',
  })
  const token = ref('')
  const userLogin = (data: UserLoginResp) => {
    userInfo.value = data
    token.value = data.token
    localStorage.setItem('token', token.value)
    localStorage.setItem('uid', data.user_id.toString())
    socket.init()
  }

  return { userInfo, token, userLogin }
}, {
  persist: {
    paths: ['userInfo']
  }
})