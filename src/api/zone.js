/**
 * 球桌分区相关请求模块
 */
import request from '@/utils/request'

// 获取球桌分区以及球桌信息
export const getZone = () => {
  return request({
    method: 'POST',
    url: '/zone'
  })
}

// 添加分区
export const addZone = data => {
  return request({
    method: 'POST',
    url: '/addZone',
    data
  })
}

// 删除分区
export const deleteZone = data => {
  return request({
    method: 'POST',
    url: '/deleteZone',
    data
  })
}

// 编辑分区信息
export const editZone = data => {
  return request({
    method: 'POST',
    url: '/editZone',
    data
  })
}
