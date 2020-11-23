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

// 获取全部用户信息
export const getUser = () => {
  return request({
    method: 'POST',
    url: '/user'
  })
}

// 添加用户信息
export const addUser = data => {
  return request({
    method: 'POST',
    url: '/addUser',
    data
  })
}

// 删除用户
export const deleteUser = data => {
  return request({
    method: 'POST',
    url: '/deleteUser',
    data
  })
}

// 批量删除用户
export const batchDeleteUser = data => {
  return request({
    method: 'POST',
    url: '/batchDeleteUser',
    data
  })
}

// 编辑用户信息
export const editUser = data => {
  return request({
    method: 'POST',
    url: '/editUser',
    data
  })
}

// 改变用户状态
export const changeState = data => {
  return request({
    method: 'POST',
    url: '/changeState',
    data
  })
}
