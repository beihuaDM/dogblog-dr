import request from '@/utils/request'

// 查询分类详情
export function getCategoryDetail(params = {}) {
  return request({
    url: '/api/category/selectDetail',
    method: 'get',
    params
  })
}

// 查询分类列表
export function getCategoryList(params = {}) {
  return request({
    url: '/api/category/selectList',
    method: 'get',
    params
  })
}
