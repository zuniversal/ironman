export default [
  {
    path: '/sm/userManage',
    authKey: 'userModel',
    component: '@/pages/sm/UserManage',
    title: '用户管理',
  },
  {
    path: '/sm/organize',
    authKey: 'organizationModel',
    component: '@/pages/sm/Organize',
    title: '组织管理',
  },
  {
    path: '/sm/role',
    authKey: 'roleModel',
    component: '@/pages/sm/Role',
    title: '角色管理',
  },
  {
    path: '/sm/dict',
    authKey: 'dictionaryModel',
    component: '@/pages/sm/Dict',
    title: '字典管理',
  },
  {
    path: '/sm/msg',
    authKey: 'messageModel',
    component: '@/pages/sm/Msg',
    title: '消息管理',
  },
  {
    path: '/sm/csMonitor',
    authKey: 'sysMonitorModel',
    component: '@/pages/sm/CsMonitor',
    title: '系统监控',
  },
  {
    path: '/sm/operateRecord',
    authKey: 'operationRecordModel',
    component: '@/pages/sm/OperateRecord',
    title: '操作记录',
  },
];
