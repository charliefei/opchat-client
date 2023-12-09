/**
 * 发送消息类型的枚举
 */
export enum WsReqMsgActionEnum {
  
}

/**
 * 发送消息的类型
 */
export interface WsReqMsg {
  action: WsReqMsgActionEnum,
  params?: any
}