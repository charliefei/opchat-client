import request from "../request";
import urls from "../urls";

export default {
  sendPrivateMessage: (msgReq: MsgReq) => request.post<BaseResp<number>>(urls.sendPrivateMessage, {
    ...msgReq
  }),
  getUnreadPrivateMessage: (user_id: number, lastMsgId: number) => 
    request<BaseResp<Array<MsgType>>>({
      url: urls.getUnreadPrivateMessage,
      method: 'get',
      params: {
        user_id,
        lastMsgId
      }
    })
}