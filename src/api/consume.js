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

// 删除所有消费信息
