export default [
  {
    path: '/cs/alarmNotify',
    authKey: '',
    component: '@/pages/cs/AlarmNotify',
    title: '告警通知',
  },
  {
    path: '/cs/systemNotify',
    authKey: '',
    component: '@/pages/cs/SystemNotify',
    title: '系统通知',
  },

  {
    path: '/cs/home',
    authKey: '',
    component: '@/pages/cs/CsHome',
    title: '首页',
  },
  {
    path: '/cs/energyInfo',
    authKey: '',
    component: '@/pages/cs/EnergyInfo',
    title: '用能概况',
    title: '首页',
  },
  {
    path: '/cs/electricInfo',
    authKey: '',
    component: '@/pages/cs/ElectricInfo',
    title: '电气信息',
  },
  {
    path: '/cs/assets',
    authKey: '',
    component: '@/pages/cs/Assets',
    title: '资产管理',
  },
  {
    path: '/cs/powerStation',
    authKey: '',
    component: '@/pages/cs/PowerStation',
    title: '我的电站',
  },
  {
    path: '/cs/powerStation/smartMonitor/:stationId',
    authKey: 'powerStation',
    component: '@/pages/om/SmartMonitor',
    title: '智能监控',
  },
  {
    path: '/cs/userCenter',
    authKey: '',
    component: '@/pages/cs/CsUserCenter',
    title: '个人中心',
  },
  {
    path: '/cs/clientReport',
    authKey: '',
    component: '@/pages/cs/CsClientReport',
    title: '客户报告',
  },
  {
    path: '/cs/inspectRecord',
    authKey: '',
    component: '@/pages/cs/CsInspectRecord',
    title: '巡检记录',
  },
  {
    path: '/cs/bussniessRecord',
    authKey: '',
    component: '@/pages/cs/BussniessRecord',
    title: '业务记录',
  },

  {
    path: '/cs/organize',
    authKey: '',
    component: '@/pages/cs/CsOrganize',
    title: '组织管理',
  },
];
