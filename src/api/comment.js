import request from '@/utils/request'

// 查询评论列表
export function getCommentList(params = {}) {
  return request({
    url: '/api/comment/selectList',
    method: 'get',
    params
  })
}

