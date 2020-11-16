/**
 * 球桌信息相关请求模块
 */

import request from '@/utils/request'

// 获取全部球桌信息
export const getTable = () => {
  return request({
    method: 'POST',
    url: '/table'
  })
}

// 球桌开始计时
export const startTime = (data) => {
  return request({
    method: 'POST',
    url: '/start',
    data
  })
}

// 球桌结束计时
export const stopTime = (data) => {
  return request({
    method: 'POST',
    url: '/stop',
    data
  })
}
