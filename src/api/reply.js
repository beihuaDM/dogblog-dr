import request from '@/utils/request'

// 查询回复列表
export function getReplyList(params = {}) {
  return request({
    url: '/api/reply/selectList',
    method: 'get',
    params
  })
}

