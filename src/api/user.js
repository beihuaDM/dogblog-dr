import request from '@/utils/request'

// 发送验证码
export function sendVerify(data) {
  return request({
    url: '/api/user/verify',
    method: 'post',
    data
  })
}

// 注册
export function register(data) {
  return request({
    url: '/api/user/register',
    method: 'post',
    data
  })
}

// 登录
export function login(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getUserInfo(params = {}) {
  return request({
    url: '/api/user/getUserInfo',
    method: 'get',
    params
  })
}
