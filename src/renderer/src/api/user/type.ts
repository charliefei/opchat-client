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