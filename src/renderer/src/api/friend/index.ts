import request from "../request";
import urls from "../urls";

export default {
  getFriendList: (user_id: number) => 
    request.get<BaseResp<FriendItem[]>>(urls.getFriendList + `?my_id=${user_id}`),
}