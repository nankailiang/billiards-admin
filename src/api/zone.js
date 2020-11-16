/**
 * 球桌分区相关请求模块
 */
import request from '@/utils/request'

// 获取球桌分区信息
export const getZone = () => {
  return request({
    method: 'POST',
    url: '/zone'
  })
}
