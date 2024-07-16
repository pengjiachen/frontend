import http from '@http/http'
export const _getUserInfo = (errMsg) => http.GET('/api/auth/userInfo', {}, errMsg)
// 登录 本质还是发送的get请求，只是封装了一遍
// export const login = function (obj) {
//   http.GET('/api/admin/login', obj)
// }
export const userLogin = obj => http.POST('/api/whitelistSetting/login', obj)
// 登出
export const userLogout = () => http.GET('/api/whitelistSetting/logout')
// 分页查询用户                               /api/whitelistSetting/pageList
export const userList = (obj) => http.GET('/api/whitelistSetting/pageList', obj)
// 删除用户1
// export const removeUser = id => http.GET('/api/whitelistSetting/removeById?id=' + id)
// 删除用户2
export const removeUser = obj => http.POST('/api/whitelistSetting/removeById2', obj)
// 批量删除用户
export const removeUsers = obj => http.POST('/api/whitelistSetting/removeByIds', obj)
// 修改用户
export const editUser = obj => http.POST('/api/whitelistSetting/edit', obj)
// 导出用户
export const exportUser = () => http.EXPORT('/api/whitelistSetting/exportUser')
