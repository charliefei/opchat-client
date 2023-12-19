interface BaseResp<T> {
  action: string,
  code: number,
  msg: string,
  data: T
}

/** 用户相关 */
interface UserRegisterReq {
  nickname: string,
  password: string,
  email: string,
  captcha: string
}

interface UserLoginReq {
  email: string,
  password: string,
}

interface UserLoginResp {
  user_id: number,
  token: string,
  nickname: string,
  email: string,
  avatar?: string,
  sex?: number
}

type UserInfoType  = {
  user_id: number,
  password: string,
  email: string,
  nickname: string,
  token: string,
  personal_note: string,
  sex: number,
  avatar: string,
  register_date: Date,
  status: number,
  notes: string,
}

type UserItem = {
  user_id: number,
  nickname: string,
  email: string,
  personal_note?: string,
  sex?: number,
  avatar: string
}

/** 好友相关 */
type FriendItem = {
  my_id: number,
  friend_id: number,
  status: number,
  create_date: Date,
}

/** 消息相关 */
type MsgReq = {
  msg_sender: number,
  msg_receiver: number,
  msg_type: "text",
  msg_content: string
}

type MsgResp = {
  action: string,
  code: number,
  msg: string,
  data: MsgType
}

type MsgType = {
  msg_content: any,
  msg_id: number,
  msg_receiver: number,
  msg_sender: number,
  msg_type: "text",
  msg_timestamp?: number
}