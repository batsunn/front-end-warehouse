//axios的第二层封装
import req from "../utils/request";

//1.歌曲列表
export function searchmusic(params) {
  return req.get("/search", params);
}

//2.音乐评论
export function searchcomment(params) {
  return req.get("/comment/hot", params);
}

//2.登录播放音乐
export function playmusic(params) {
  return req.get("/song/url", params);
}
