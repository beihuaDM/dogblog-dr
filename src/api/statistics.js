import request from '@/utils/request'

// 添加一条统计
export function addStatistics(data) {
  return request({
    url: '/api/statistics/create',
    method: 'post',
    data
  })
}
