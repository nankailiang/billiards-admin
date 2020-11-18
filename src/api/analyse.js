/**
 * 数据分析相关请求模块
 */
import request from '@/utils/request'

// 获取近半年每个月营业额信息
export const getTurnover = () => {
  return request({
    method: 'POST',
    url: '/turnover'
  })
}

// 获取每个球桌使用总时长
export const getDuration = () => {
  return request({
    method: 'POST',
    url: '/duration'
  })
}

// 获取近半年每个月办理会员人数
export const getAddmun = () => {
  return request({
    method: 'POST',
    url: '/addmun'
  })
}

// 获取近半年每个月会员充值总和
export const getInmoney = () => {
  return request({
    method: 'POST',
    url: '/inmoney'
  })
}
