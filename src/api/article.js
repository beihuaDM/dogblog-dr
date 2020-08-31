import request from '@/utils/request'

// 查询文章详情
export function getArticleDetail(params = {}) {
  return request({
    url: '/api/article/selectDetail',
    method: 'get',
    params
  })
}

// 查询文章列表
export function getArticleList(params = {}) {
  return request({
    url: '/api/article/selectList',
    method: 'get',
    params
  })
}
