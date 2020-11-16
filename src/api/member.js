/**
 * 会员相关请求模块
 */

import request from '@/utils/request'

// 获取全部会员信息
export const getMember = () => {
  return request({
    method: 'POST',
    url: '/member'
  })
}

// 添加会员信息
export const addMember = (data) => {
  return request({
    method: 'POST',
    url: '/addMember',
    data
  })
}

// 删除会员
export const deleteMember = (data) => {
  return request({
    method: 'POST',
    url: '/deleteMember',
    data
  })
}

// 删除会员
export const batchDeleteMember = (data) => {
  return request({
    method: 'POST',
    url: '/batchDeleteMember',
    data
  })
}

// 编辑会员信息
export const editMember = (data) => {
  return request({
    method: 'POST',
    url: '/editMember',
    data
  })
}

// 会员充值
export const memberRecharge = (data) => {
  return request({
    method: 'POST',
    url: '/memberRecharge',
    data
  })
}

// 会员消费
export const memberConsume = (data) => {
  return request({
    method: 'POST',
    url: '/memberConsume',
    data
  })
}
