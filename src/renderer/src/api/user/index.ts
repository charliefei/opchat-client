import request from '../request'
import { HttpApiEnum } from '../enums'

export const sendCaptcha = (email: string) =>
  request.post(HttpApiEnum.SEND_CAPTCHA + `?email=${email}`)


export const reqRegister = (req: UserRegisterReq) =>
  request.post(HttpApiEnum.REGISTER, req)


export const reqLogin = (req: UserLoginReq) =>
  request.post(HttpApiEnum.LOGIN, req) 

export const reqInfo = (keyword: string) =>
  request.get(HttpApiEnum.INFO + `?keyword=${keyword}`)