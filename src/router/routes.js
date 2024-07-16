const loginPage = [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '../pages/login/Login')
  }
]
const screenPage = [
  {
    path: '/screen',
    name: 'screen',
    component: () =>
        import(/* webpackChunkName: "Login" */ '../pages/bigscreen/index.vue')
  }
]
const mainPage = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/main',
    name: 'main',
    component: () =>
      import(/* webpackChunkName: "Main" */ '../pages/main/Main'),
    children: [
      {
        path: 'first',
        name: 'first',
        component: () =>
            import(
              /* webpackChunkName: "Second" */ '../pages/main/routes/first/First'
            )
      },
      {
        path: 'second/second',
        name: 'second',
        component: () =>
            import(
              /* webpackChunkName: "First" */ '../pages/main/routes/second/Second'
            )
      },
      {
        path: 'userList',
        name: 'userList',
        component: () =>
            import(
              /* webpackChunkName: "First" */ '../pages/main/routes/users/UserList.vue'
            )
      }
    ]
  }
]

const errorPage = [
  {
    path: '/notFound',
    name: 'notFound',
    component: () =>
      import(/* webpackChunkName: "NotFound" */ '../pages/error/NotFound')
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: () =>
      import(/* webpackChunkName: "Forbidden" */ '../pages/error/Forbidden')
  },
  {
    path: '/badGateway',
    name: 'badGateway',
    component: () =>
      import(/* webpackChunkName: "BadGateway" */ '../pages/error/BadGateway')
  },
  {
    path: '*',
    redirect: '/notFound'
  }
]

// 两种组件：需要登录的  不需要登录的（白名单）
// 需要登录访问的组件一定要在mainPage中定义路由
// 不需要登录访问的无所谓

// 白名单路由的定义：src/store/modules/permission/state.js
// 角色-菜单 菜单的定义：src/store/modules/sidebar/state.js
// 角色的定义：src/store/modules/role/state.js

// 设置当前用户类型为2，然后设置对应的菜单-用户管理（用户列表）
// 创建组件  配置路由  配置菜单

// 一定要定义  角色-路由   角色-菜单

//  ...扩展运算符  作用就是可以解构数组对象
// let arr = [1,2]
// let arr1 = [3,4]
// let arr2 = [...arr, ...arr1]
export default [...loginPage, ...mainPage, ...errorPage, ...screenPage]
