/**
 * 消费信息相关请求模块
 */

import request from '@/utils/request'

// 生成消费信息
export const setConsume = (data) => {
  return request({
    method: 'POST',
    url: '/setConsume',
    data
  })
}

// 查询所有消费信息
export const getConsume = () => {
  return request({
    method: 'POST',
    url: '/consume'
  })
}

// 删除单条消费信息
export const deleteConsume = (data) => {
  return request({
    method: 'POST',
    url: '/deleteConsume',
    data
  })
}

// 删除多条消费信息
export const batchDeleteConsume = (data) => {
  return request({
    method: 'POST',
    url: '/batchDeleteConsume',
    data
  })
}
