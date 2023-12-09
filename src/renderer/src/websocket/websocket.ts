import { WsReqMsg } from './types'
import { worker } from './initWorker'

class WS {
  constructor() {
    // 初始化ws连接
    this.initConnect()
    // 监听子线程消息
    worker.addEventListener('message', this.onWorkerMsg)
  }

  initConnect = () => {
    // 初始化 ws
    worker.postMessage('{"type":"initWS"}')
  }

  /**
   * 监听子线程消息
   * @param e 消息事件对象
   */
  onWorkerMsg = (e: MessageEvent<any>) => {
    const params: { type: string; value: any } = JSON.parse(e.data)
    switch (params.type) {
      case 'message': {
        this.#onMessage(params.value)
        break
      }
      case 'open': {
        this.#onOpen()
        break
      }
      case 'close':
      case 'error': {
        this.#onClose()
        break
      }
    }
  }

  // 连接关闭时
  #onClose = () => {
    // ...
  }

  // 连接成功时
  #onOpen = () => {
    // ...
  }

  // 向子线程发送消息
  send(msg: WsReqMsg) {
    worker.postMessage(
      `{"type":"message","value":${typeof msg === 'string' ? msg : JSON.stringify(msg)}}`,
    )
  }

  // 收到消息回调
  #onMessage = (value: any) => {
    console.log(JSON.parse(value));
  }
}

export default new WS()