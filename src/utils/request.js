/**
 * 基于axios封装的请求模块
 */
import axios from 'axios'

// 创建一个axios实例
const request = axios.create({
  baseURL: 'http://localhost:3000/' // 请求的基础路径
})

// 请求拦截器

// 响应拦截器

// 导出请求方法
export default request
