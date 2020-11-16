/**
 * 基于axios封装的请求模块
 */
import axios from 'axios'

// 创建一个axios实例
const request = axios.create({
  baseURL: 'http://localhost:3000/' // 请求的基础路径
})

// 请求拦截器
request.interceptors.request.use(
  function (config) {
  // 获取浏览器保存的token
    const token = window.localStorage.getItem('token')
    if (token) {
      config.headers.Authorzation = token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

// 导出请求方法
export default request
