/**
 * 用户相关请求模块
 */
import request from '@/utils/request'

// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/login',
    data
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'POST',
    url: '/info'
  })
}
