export default {
  whiteList: ['/', 'notFound', 'login', 'forbidden', 'badGateway', 'screen'],
  // 下边就定义什么角色能访问什么路由，*表示所有
  permissionMap: {
    1: {
      main: ['*']
    },
    2: {
      main: ['userList']
    },
    3: {
      main: ['*']
    },
    4: {
      main: ['*']
    }
  }
}
