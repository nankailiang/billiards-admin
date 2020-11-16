/**
 * 充值信息相关请求模块
 */

import request from '@/utils/request'

// 生成充值信息
export const setRecharge = (data) => {
  return request({
    method: 'POST',
    url: '/setRecharge',
    data
  })
}

// 查询所有充值信息
export const getRecharge = () => {
  return request({
    method: 'POST',
    url: '/recharge'
  })
}

// 删除单条充值信息
export const deleteRecharge = (data) => {
  return request({
    method: 'POST',
    url: '/deleteRecharge',
    data
  })
}

// 删除多条充值信息
export const batchDeleteRecharge = (data) => {
  return request({
    method: 'POST',
    url: '/batchDeleteRecharge',
    data
  })
}
