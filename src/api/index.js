import http from './public'
const baseUrl = '/api'
// 登陆
export const userLogin = (params) => {
  return http.fetchPost(`${baseUrl}/login`, params)
}
// 退出登录
export const userLogout = (params) => {
  return http.fetchGet(`${baseUrl}/logout`, params)
}
// 注册
export const userRegister = (params) => {
  return http.fetchPost(`${baseUrl}/register`, params)
}
// 用户信息
export const userInfo = (params) => {
  return http.fetchPost(`${baseUrl}/users/userInfo`, params)
}
// 更新用户信息
export const userUpdate = (params) => {
  return http.fetchPost(`${baseUrl}/users/update`, params)
}
// 分类
export const goodsIp = (params) => {
  return http.fetchGet(`${baseUrl}/goods/category`, params)
}
// 获取商品
export const goodsInfo = (params) => {
  return http.fetchGet(`${baseUrl}/goods/page`, params)
}
// 获取多个商品信息
export const goodsMultiple = (params) => {
  return http.fetchGet(`${baseUrl}/goods/list`, params)
}
// 商品详情
export const goodsDetails = (params) => {
  return http.fetchGet(`${baseUrl}/goods/details`, params)
}
// 添加订单
export const addOrder = (params) => {
  return http.fetchPost(`${baseUrl}/orders/create`, params)
}
// 删除订单
export const delOrder = (params) => {
  return http.fetchPost(`${baseUrl}/orders/delete`, params)
}