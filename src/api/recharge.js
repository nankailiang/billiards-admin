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

// 查询所有消费信息

// 删除所有消费信息
