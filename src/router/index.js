import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import permission from './permission'
import store from '../store/'
// store理解为前端的缓存
import { clearHttpRequestingList } from '@http/httpRequestList'
import routes from './routes'

Vue.$httpRequestList = []
Vue.use(Router)

let router = new Router({
  routes
})
// 每一次跳转路由时都要验证
router.beforeEach((to, from, next) => {
  if (to.meta.keepAlive) {
    store.commit('routecache/keepAlive', to.name)
  }
  clearHttpRequestingList()
  // 进度条开始
  NProgress.start()
  // 获取白名单路由
  const whiteList = store.getters['permission/getWhiteList']
  if (whiteList.indexOf(to.name) > -1 || whiteList.indexOf(to.path) > -1) {
    // 如果下一个路由是在白名单内，直接放走
    next()
    // store.getters['user/getUserId'] 从浏览器获取你的用户信息
  } else if (!store.getters['user/getUserId']) { // 下一个路由必须要登录才能访问
    // 尝试从浏览器获取你的登录信息，但是并没有获取到
    store.dispatch('user/fetchUserInfo').then(res => {
      if (res.data) {
        // 权限校验
        permission(store, routes, to, next)
      } else {
        next({ name: 'login' })
        // switch (res.code) {
        //   case -500:
        //     next({ name: 'badGateway' })
        //     break
        //   case 70005:
        //     next({ name: 'login' })
        //     break
        // }
      }
    })
  } else {
    // 权限校验
    permission(store, routes, to, next)
  }
})
router.afterEach(() => {
  // 进度条结束
  NProgress.done()
})
export default router
