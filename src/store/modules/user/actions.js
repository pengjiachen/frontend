import { _getUserInfo } from '@api/user'
import types from './types'
export default {
  async fetchUserInfo ({ commit }) {
    // 从后端获取当前用户  但是现在没有后端  自己写死一个用户
    let res = await _getUserInfo()
    // res就是后端返回的当前用户信息
    // 模拟的一个角色信息  这个角色类型为1
    // 前端会根据得到的角色类型，然后渲染对应的菜单
    // let res = {
    //   code: 0,
    //   status: true,
    //   data: {
    //     id: 1,
    //     name: '卢鑫培',
    //     userType: 2
    //   }
    // }
    if (res.data) {
      // 保存信息到前端
      commit(types.SET_USER_ID, res.data.id)
      commit(types.SET_USER_NAME, res.data.name)
      commit(types.SET_USER_TYPE, res.data.userType)
    }
    return res
  },
  async clearUserInfo ({ commit }) {
    // 清除前端用户信息
    commit(types.SET_USER_ID, null)
    commit(types.SET_USER_NAME, null)
    commit(types.SET_USER_TYPE, null)
  }
}
