import { useMessageStore } from "@renderer/store/message";
import { MsgTypeEnum } from "./wsEnum";

let url = 'ws://localhost:5438/ws/'

interface Socket {
  websocket: WebSocket | null,
  init: () => void,
  send: (e: any) => void,
  close: () => void
}

const socket: Socket = {
  websocket: null,

  init: () => {
    const reconnectInterval = 3000;
    let reconnectTimer: NodeJS.Timeout | null = null;

    const reconnect = () => {
      if(!localStorage.getItem('uid')) return
      if (!socket.websocket || socket.websocket.readyState === WebSocket.CLOSED) {
        console.log('尝试3次重新连接Websocket...');
        for (let i = 0; i < 3; i++) {
          socket.init();
          if (socket.websocket?.OPEN === WebSocket.OPEN) 
            break;
        }
      }
    };

    socket.websocket = new WebSocket(url + localStorage.getItem('uid'));

    socket.websocket.onopen = function (e) {
      console.log('打开websocket连接 --- ', e);
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
    };

    socket.websocket.onclose = function (e) {
      console.log('断开websocket连接 --- ', e);
      reconnectTimer = setTimeout(reconnect, reconnectInterval);
    };

    socket.websocket.onerror = function (e) {
      console.log('websocket发生错误 --- ', e);
      socket.websocket?.close();
    };

    socket.websocket.onmessage = function (e) {
      console.log("websocket消息 --- ", e);
      const msgResp = JSON.parse(e.data) as MsgResp
      const messageStore = useMessageStore()

      switch (msgResp.action) {
        case MsgTypeEnum.PRIVATE_MESSAGE:
          messageStore.receiveMsg(msgResp.data);
          break;
        default:
          console.log('未知消息类型 --- ', msgResp);
          break;
      }
    };
  },

  send: (e) => {
    if (socket.websocket?.readyState === 0) {
      setTimeout(() => {
        socket.websocket?.send(JSON.stringify(e))
      }, 1000)
    } else {
      socket.websocket?.send(JSON.stringify(e))
    }
  },

  close: () => {
    socket.websocket?.close()
  }
}

export default socket