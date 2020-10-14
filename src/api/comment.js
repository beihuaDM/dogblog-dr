import request from "@/utils/request";

// 查询评论列表
export function getCommentList(params = {}) {
  return request({
    url: "/api/comment/selectList",
    method: "get",
    params
  });
}
// 发表评论
export function createComment(params = {}) {
  return request({
    url: "/api/comment/create",
    method: "post",
    data: params
  });
}

// 更新评论 赞数 踩数
export function updateCommentVote(params = {}) {
  return request({
    url: "/api/comment/update",
    method: "post",
    data: params
  });
}
