import request from "@/utils/request";

// 查询文章详情
export function getArticleDetail(params = {}) {
  return request({
    url: "/api/article/selectDetail",
    method: "get",
    params
  });
}

// 查询文章列表
export function getArticleList(params = {}) {
  return request({
    url: "/api/article/selectList",
    method: "get",
    params
  });
}

// 更新文章浏览量
export function updateBrowse(params = {}) {
  return request({
    url: "/api/article/updateBrowse",
    method: "post",
    data: params
  });
}
