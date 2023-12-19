import request from '../request'
import urls from '../urls'

export const sendCaptcha = (email: string) =>
  request.post<BaseResp<null>>(urls.sendCaptcha + `?email=${email}`)

export const reqRegister = (req: UserRegisterReq) =>
  request.post<BaseResp<number>>(urls.register, req)

export const reqLogin = (req: UserLoginReq) =>
  request.post<BaseResp<UserLoginResp>>(urls.login, req)

export const reqInfo = (keyword: string) =>
  request.get<BaseResp<Array<UserItem>>>(urls.info + `?keyword=${keyword}`)

export const reqInfoById = (user_id: number) => 
  request.get<BaseResp<UserInfoType>>(urls.infoById + `?user_id=${user_id}`)