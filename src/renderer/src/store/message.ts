import { defineStore } from "pinia";
import { ref } from "vue";
import { messageDb } from '@renderer/api/db'
import MsgApis from '@renderer/api/msg'

export const useMessageStore = defineStore('message', () => {
  const message = ref<MsgType>()

  const receiveMsg = async (msg: MsgType) => {
    message.value = {...msg, msg_timestamp: new Date().getTime()}
    console.log('receiveMsg:', msg);
    try {
      return await messageDb.messages.add({
        msg_id: msg.msg_id,
        msg_content: msg.msg_content,
        msg_receiver: msg.msg_receiver,
        msg_sender: msg.msg_sender,
        msg_type: msg.msg_type,
        msg_timestamp: new Date().getTime()
      })
    } catch (error) {
      return Promise.reject(new Error('添加消息失败'))
    }
  }

  const getMsgListLocal = async () => {
    try {
      return await messageDb.messages.toArray()
    } catch (error) {
      return Promise.reject(new Error('获取消息失败'))
    }
  }

  const getLastMsgLocal = async () => {
    try {
      return (await messageDb.messages
        .toCollection()
        .reverse()
        .sortBy('msg_id'))[0]
    } catch (error) {
      return Promise.reject(new Error('获取消息失败'))
    }
  }

  const getUnreadMsgList = async (uid: number) => {
    try {
      const lastMsg = await getLastMsgLocal()
      console.log(lastMsg);
      const {data: res} = await MsgApis.getUnreadPrivateMessage(uid, lastMsg.msg_id)
      console.log(res);
      if(res.data) {
        return res.data
      }
      return null
    } catch (error) {
      return Promise.reject(new Error('获取消息失败'))
    }
  }

  const saveBatchMsgToLocal = async (msgList: MsgType[]) => {
    try {
      const id = await messageDb.messages.bulkAdd(msgList)
      console.log('saveBatchMsgToLocal:', id);
      return id;
    } catch (error) {
      return Promise.reject(new Error('获取消息失败'))
    }
  }
  
  return {
    message, 
    receiveMsg, 
    getMsgListLocal, 
    getUnreadMsgList,
    saveBatchMsgToLocal
  }
})