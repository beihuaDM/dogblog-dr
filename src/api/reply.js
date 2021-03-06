import request from "@/utils/request";

// 查询回复列表
export function getReplyList(params = {}) {
  return request({
    url: "/api/reply/selectList",
    method: "get",
    params
  });
}

// 发表回复
export function createReply(params = {}) {
  return request({
    url: "/api/reply/create",
    method: "post",
    data: params
  });
}

// 更新回复 赞数 踩数
export function updateReplyVote(params = {}) {
  return request({
    url: "/api/reply/update",
    method: "post",
    data: params
  });
}
