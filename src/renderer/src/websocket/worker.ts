// 发消息给主进程
const postMsg = ({ type, value }: { type: string; value?: object }) => {
  self.postMessage(JSON.stringify({ type, value }))
}

// ws instance
let connection: WebSocket

// ws连接发消息
const connectionSend = (value: object) => {
  connection?.send(JSON.stringify(value))
}

// ws连接error
const onConnectError = () => {
  postMsg({ type: 'error' })
}
// ws连接close
const onConnectClose = () => {
  postMsg({ type: 'close' })
}
// ws连接成功
const onConnectOpen = () => {
  postMsg({ type: 'open' })
}
// ws接收到消息
const onConnectMsg = (e: any) => postMsg({ type: 'message', value: e.data })

// 初始化 ws 连接
const initConnection = () => {
  connection?.removeEventListener('message', onConnectMsg)
  connection?.removeEventListener('open', onConnectOpen)
  connection?.removeEventListener('close', onConnectClose)
  connection?.removeEventListener('error', onConnectError)
  // 建立链接
  // 本地配置到 .env 里面修改。生产配置在 .env.production 里面
  connection = new WebSocket("ws://localhost:8080")
  // 收到消息
  connection.addEventListener('message', onConnectMsg)
  // 建立链接
  connection.addEventListener('open', onConnectOpen)
  // 关闭连接
  connection.addEventListener('close', onConnectClose)
  // 连接错误
  connection.addEventListener('error', onConnectError)
}

self.onmessage = (e: MessageEvent<string>) => {
  const { type, value } = JSON.parse(e.data)
  switch (type) {
    case 'initWS': {
      initConnection()
      break
    }
    case 'message': {
      if (connection?.readyState !== 1) return
      connectionSend(value)
      break
    }
  }
}