import request from "../request";
import urls from "../urls";

export default {
  sendPrivateMessage: (msgReq: MsgReq) => request.post<BaseResp<number>>(urls.sendPrivateMessage, {
    ...msgReq
  })
}