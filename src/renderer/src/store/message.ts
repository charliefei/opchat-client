import { defineStore } from "pinia";
import { ref } from "vue";

export const useMessageStore = defineStore('message', () => {
  const msgResp = ref<MsgType>()

  const receiveMsg = (msg: MsgType) => {
    
  }
  
  return {msgResp, receiveMsg}
})