export default [
  {
    path: '/sm/userManage',
    authKey: 'user',
    component: '@/pages/sm/UserManage',
    title: '用户管理',
  },
  {
    path: '/sm/organize',
    authKey: 'organization',
    component: '@/pages/sm/Organize',
    title: '组织管理',
  },
  {
    path: '/sm/role',
    authKey: 'role',
    component: '@/pages/sm/Role',
    title: '角色管理',
  },
  {
    path: '/sm/dict',
    authKey: 'dictionary',
    component: '@/pages/sm/Dict',
    title: '字典管理',
  },
  {
    path: '/sm/msg',
    authKey: 'message',
    component: '@/pages/sm/Msg',
    title: '消息管理',
  },
  {
    path: '/sm/csMonitor',
    authKey: 'monitor',
    component: '@/pages/sm/CsMonitor',
    title: '系统监控',
  },
  {
    path: '/sm/operateRecord',
    authKey: 'operationRecord',
    component: '@/pages/sm/OperateRecord',
    title: '操作记录',
  },
];
