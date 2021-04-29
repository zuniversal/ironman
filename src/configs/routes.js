import React from 'react';
import { TabletOutlined, ScheduleFilled } from '@ant-design/icons';
import Icon from '@/components/Widgets/Icons';
import { LogoutOutlined, SwapOutlined } from '@ant-design/icons';
import SearchForm from '@/common/SearchForm';

const placeIcon = <Icon icon={''} className={'subIcon'} />;

export const PLATFORM = 'base';
export const DEF_BUSSNIESS_TAB = 'smartOMS';

export const platformSelectConfig = [
  {
    value: 'base',
    label: '基础数据平台',
  },
  {
    value: 'iot',
    label: 'Iot平台',
  },
  {
    value: 'smartOMS',
    label: '业务平台',
  },
];

export const bussniessTabConfig = [
  {
    value: 'smartOMS',
    label: '智慧运维',
  },
  {
    value: 'smartEfficiency',
    label: '智慧能效',
  },
  {
    value: 'powerGrid',
    label: '微电网',
  },
];

export const isSmartOMS = val => bussniessTabConfig.some(v => v.value == val);
export const plaformFormat = val => (isSmartOMS(val) ? DEF_BUSSNIESS_TAB : val);

export const customerInformation = {
  platform: 'base',
  path: '/om/clientInfo',
  authKey: 'customerInformation',
  name: '客户信息管理',
  icon: <ScheduleFilled />,
  icon: <Icon icon={'clientInfoManage'} />,
  component: '../Shifts',
  routes: [
    {
      path: '/om/contract',
      authKey: 'contract',
      name: '合同管理',
      // icon: <ScheduleFilled />,
      // icon: <Icon icon={'contract'} />,
      // icon: placeIcon,
      component: '../pages/om/Contract',
    },
    {
      path: '/om/client',
      authKey: 'customer',
      name: '客户管理',
      // icon: <ScheduleFilled />,
      // icon: <Icon icon={'client'} />,
      // icon: placeIcon,
      component: '../pages/om/Client',
    },
    {
      path: '/om/assets',
      authKey: 'asset',
      name: '资产管理',
      // icon: <ScheduleFilled />,
      // icon: <Icon icon={'assets'} />,
      // icon: placeIcon,
      component: '../pages/om/Assets',
    },
    {
      path: '/om/houseNo',
      authKey: 'number',
      name: '户号管理',
      // icon: <ScheduleFilled />,
      // icon: <Icon icon={'houseNo'} />,
      // icon: placeIcon,
      component: '../pages/om/HouseNo',
    },
    {
      path: '/om/powerStation',
      authKey: 'powerStation',
      name: '电站管理',
      // icon: <Icon icon={'powerStation'} />,
      // icon: placeIcon,
      component: '../pages/om/PowerStation',
    },
    {
      path: '/om/clientReport',
      authKey: 'report',
      name: '客户报告',
      // icon: <Icon icon={'powerStation'} />,
      // icon: placeIcon,
      component: '../pages/om/ClientReport',
    },
  ],
};

export const system = {
  platform: 'base',
  path: '/system',
  authKey: 'system',
  name: '系统管理',
  name: '集团管理',
  icon: <Icon icon={'systemManage'} />,
  component: '../Waiter',
  routes: [
    {
      path: '/sm/userManage',
      authKey: 'user',
      name: '用户管理',
      // icon: <ScheduleFilled />,
      // icon: <Icon icon={'userManage'} />,
      // icon: placeIcon,
      component: '../pages/sm/UserManage',
    },
    {
      path: '/sm/organize',
      authKey: 'organization',
      name: '组织管理',
      // icon: <ScheduleFilled />,
      // icon: <Icon icon={'organize'} />,
      // icon: placeIcon,
      component: '../pages/sm/Organize',
    },
    {
      path: '/sm/role',
      authKey: 'role',
      name: '角色管理',
      // icon: <ScheduleFilled />,
      // icon: <Icon icon={'role'} />,
      // icon: placeIcon,
      component: '../pages/sm/Role',
    },
    {
      path: '/sm/dict',
      authKey: 'dictionary',
      name: '字典管理',
      // icon: <ScheduleFilled />,
      // icon: <Icon icon={'dict'} />,
      // icon: placeIcon,
      component: '../pages/sm/Dict',
    },
    {
      path: '/sm/msg',
      authKey: 'message',
      name: '消息管理',
      // icon: <ScheduleFilled />,
      // icon: <Icon icon={'msg'} />,
      // icon: placeIcon,
      component: '../pages/sm/Msg',
    },
    // {
    //   path: '/sm/csMonitor',
    //   authKey: 'monitor',
    //   name: '系统监控',
    //   // icon: <ScheduleFilled />,
    //   // icon: <Icon icon={'csMonitor'} />,
    //   // icon: placeIcon,
    //   component: '../pages/sm/CsMonitor',
    // },
    // {
    //   path: '/sm/operateRecord',
    //   authKey: 'operationRecord',
    //   name: '操作记录',
    //   // icon: <ScheduleFilled />,
    //   // icon: <Icon icon={'operateRecord'} />,
    //   // icon: placeIcon,
    //   component: '../pages/sm/OperateRecord',
    // },
  ],
};

export const monitor = {
  platform: 'iot',
  path: '/om/alarm',
  authKey: 'alarm',
  name: '监控管理',
  icon: <ScheduleFilled />,
  icon: <Icon icon={'alarmManage'} />,
  component: '../Alarm',
  routes: [
    {
      path: '/om/iotAccount',
      authKey: 'iotAccount',
      name: '物联网卡台账',
      component: '../pages/om/iotAccount',
    },
    {
      path: '/om/monitorApproval',
      authKey: 'monitorEquipment',
      name: '监控审批单',
    },
    {
      path: '/om/monitorManage',
      authKey: 'monitorEquipment',
      name: '监控设备管理',
      // icon: <ScheduleFilled />,
      // icon: <Icon icon={'monitorManage'} />,
      // icon: placeIcon,
      component: '../pages/om/MonitorManage',
    },
    {
      path: '/om/monitorDevice',
      authKey: 'monitorEquipment',
      name: '监控设备',
    },
    {
      path: '/om/alarmTemplate',
      authKey: 'alarmTemplate',
      name: '告警策略模板',
      component: '../pages/om/AlarmTemplate',
    },
    {
      path: '/om/alarmRecord',
      authKey: 'alarmRecord',
      name: '告警记录',
      // icon: <ScheduleFilled />,
      // icon: placeIcon,
      component: '../pages/om/AlarmRecord',
    },
  ],
};

export const smartOMS1 = {
  platform: 'bussniess',
  platform: 'smartOMS',
  path: '/om/operation',
  authKey: 'inspection',
  name: '巡检运维',
  icon: <ScheduleFilled />,
  icon: <Icon icon={'inspect'} />,
  component: '../pages/om/Operation',
  routes: [
    {
      path: '/om/inspectPlan',
      authKey: 'inspectionPlan',
      name: '巡检计划',
      // icon: <ScheduleFilled />,
      // icon: placeIcon,
      component: '../pages/om/InspectPlan',
    },
    {
      path: '/om/inspectMission',
      authKey: 'inspectionTask',
      name: '巡检任务',
      // icon: <ScheduleFilled />,
      // icon: placeIcon,
      component: '../pages/om/InspectMission',
    },
    {
      path: '/om/inspectRecord',
      authKey: 'inspectionRecord',
      name: '巡检记录',
      // icon: <ScheduleFilled />,
      // icon: placeIcon,
      component: '../pages/om/InspectRecord',
    },
    {
      path: '/om/weak',
      authKey: 'defect',
      name: '缺陷管理',
      // icon: <ScheduleFilled />,
      // icon: placeIcon,
      component: '../pages/om/Weak',
    },
  ],
};

export const smartOMS2 = {
  platform: 'bussniess',
  platform: 'smartOMS',
  haveDetail: true,
  path: '/om/shifts',
  authKey: 'team',
  name: '班组管理',
  icon: <ScheduleFilled />,
  icon: <Icon icon={'shiftsManage'} />,
  component: '../Shifts',
  routes: [
    {
      path: '/om/shiftsManage',
      authKey: 'teamManagement',
      name: '班组管理',
      // icon: <ScheduleFilled />,
      // icon: placeIcon,
      component: '../pages/om/ShiftsManage',
    },
    // {
    //   path: '/om/shiftsManage/111',
    //   authKey: 'teamManagement',
    //   name: '班组管理2',
    //   // icon: <ScheduleFilled />,
    //   // icon: placeIcon,
    //   component: '../pages/om/ShiftsManage',
    // },
    {
      path: '/om/shiftsArrange',
      authKey: 'teamSchedule',
      name: '排班',
      // icon: <ScheduleFilled />,
      // icon: placeIcon,
      component: '../pages/om/ShiftsArrange',
    },
    {
      hideInMenu: true,
      hide: true,
      // path: '/om/shiftsArrange',
      path: '/om/shiftsArrangeDetail',
      authKey: 'teamSchedule',
      name: '新增/编辑排班',
      // icon: <ScheduleFilled />,
      // icon: placeIcon,
      component: '../pages/om/ShiftsArrange',
    },
    // {
    //   path: '/om/shiftsArrange/shiftsArrangeDetail',
    //   name: '排班',
    //   // icon: <ScheduleFilled />,
    //   component: '../pages/om/ShiftsArrange/ShiftsArrangeDetail',
    // },
    {
      path: '/om/shiftsTransfer',
      authKey: 'taskHandover',
      name: '交接班',
      // icon: <ScheduleFilled />,
      // icon: placeIcon,
      component: '../pages/om/ShiftsTransfer',
    },
  ],
};

export const smartOMS3 = {
  platform: 'bussniess',
  platform: 'smartOMS',
  path: '/om/ps',
  authKey: 'business',
  name: '业务管理',
  icon: <ScheduleFilled />,
  icon: <Icon icon={'bussniessManage'} />,
  component: '../pages/om/PowerStation',
  routes: [
    {
      path: '/om/goods',
      authKey: 'materiel',
      name: '物料管理',
      // icon: <ScheduleFilled />,
      // icon: <Icon icon={'goods'} />,
      // icon: placeIcon,
      component: '../pages/om/Goods',
    },
    {
      path: '/om/missionsManage',
      authKey: 'task',
      name: '任务管理',
      // icon: <ScheduleFilled />,
      // icon: <Icon icon={'missionsManage'} />,
      // icon: placeIcon,
      component: '../pages/om/MissionsManage',
    },
    {
      path: '/om/workOrder',
      authKey: 'order',
      name: '工单管理',
      // icon: <ScheduleFilled />,
      // icon: <Icon icon={'workOrder'} />,
      // icon: placeIcon,
      component: '../pages/om/Workorder',
    },
  ],
};

export const smartEfficiency = [
  {
    platform: 'smartEfficiency',
    path: '/om/能效客户',
    authKey: 'business',
    name: '能效客户',
    icon: <Icon icon={'bussniessManage'} />,
    component: '../pages/om/PowerStation',
    routes: [
      {
        path: '/om/敬请期待1',
        authKey: 'materiel',
        name: '敬请期待',
        component: '../pages/om/敬请期待',
      },
    ],
  },
  {
    platform: 'smartEfficiency',
    path: '/om/报告管理',
    authKey: 'business',
    name: '报告管理',
    icon: <Icon icon={'bussniessManage'} />,
    component: '../pages/om/PowerStation',
    routes: [
      {
        path: '/om/敬请期待2',
        authKey: 'materiel',
        name: '敬请期待',
        component: '../pages/om/敬请期待',
      },
    ],
  },
];

export const smartOMS = [smartOMS1, smartOMS2, smartOMS3, ...smartEfficiency];

export const managerRoutes = [
  // {
  //   path: '/dashBoard',
  //   name: '大屏展示',
  //   icon: <ScheduleFilled />,
  //   component: '../DashBoard',
  // },
  // {
  //   path: '/om/test',
  //   name: '开发测试',
  //   icon: <ScheduleFilled />,
  //   icon: <Icon icon={'test'} />,
  // },

  // {
  //   path: '/login',
  //   name: '登录页',
  //   icon: <ScheduleFilled />,
  //   icon: <Icon icon={'home'} />,
  //   component: '../Home',
  // },
  {
    noAuth: true,
    path: '/om/home',
    name: '首页',
    icon: <ScheduleFilled />,
    icon: <Icon icon={'home'} />,
    component: '../Home',
  },

  // {
  //   noAuth: true,
  //   path: '/om/drawPanel',
  //   name: '一次系统图',
  //   icon: <Icon icon={'home'} />,
  //   component: '../pages/om/DrawPanel',
  // },

  // {
  //   path: '/om/userCenter',
  //   name: '个人中心',
  //   icon: <ScheduleFilled />,
  //   icon: <Icon icon={'userCenter'} />,
  //   component: '../pages/userCenter',
  // },

  customerInformation,
  monitor,
  ...smartOMS,

  // {
  //   path: '/kpi',
  //   authKey: 'achievements',
  //   name: '绩效管理',
  //   icon: <ScheduleFilled />,
  //   icon: <Icon icon={'kpiManage'} />,
  //   component: '../Kpi',
  //   routes: [
  //     {
  //       path: '/om/appraise',
  //       authKey: 'assessmentEvaluate',
  //       name: '考核评价',
  //       // icon: <ScheduleFilled />,
  //       // icon: placeIcon,
  //       component: '../Appraise',
  //     },
  //     {
  //       path: '/om/assessment',
  //       authKey: 'assessmentConfig',
  //       name: '考核配置',
  //       // icon: <ScheduleFilled />,
  //       // icon: placeIcon,
  //       component: '../assessment',
  //     },
  //   ],
  // },

  // {
  //   path: '/waiter',
  //   authKey: 'customerService',
  //   name: '客服管理',
  //   icon: <Icon icon={'customerManage'} />,
  //   component: '../Waiter',
  //   routes: [
  //     {
  //       path: '/om/onlineService',
  //       authKey: 'onlineCustomerService',
  //       name: '在线客服',
  //       // icon: <ScheduleFilled />,
  //       // icon: placeIcon,
  //       component: '../Online',
  //     },
  //     {
  //       path: '/om/visitManage',
  //       authKey: 'returnVisit',
  //       name: '回访管理',
  //       // icon: <Icon icon={'csOrganize'} />,
  //       // icon: placeIcon,
  //       component: '../pages/om/visitManage',
  //     },
  //   ],
  // },

  system,

  // {
  //   path: '/knowledge',
  //   authKey: 'newsAndKnowledge',
  //   name: '新闻与知识点',
  //   icon: <Icon icon={'customerManage'} />,
  //   component: '../Waiter',
  //   routes: [
  //     {
  //       path: '/om/newsKnow',
  //       authKey: 'newsAndKnowledgePoint',
  //       name: '新闻与知识点',
  //       // icon: placeIcon,
  //       component: '../Online',
  //     },
  //     {
  //       path: '/om/knowledgeCate',
  //       authKey: 'knowledgeBase',
  //       name: '知识库分类',
  //       // icon: placeIcon,
  //       component: '../pages',
  //     },
  //   ],
  // },
];

export const customerRoutes = [];
export const customerRoutes2 = [
  {
    noAuth: true,
    path: '/cs/home',
    name: '首页',
    icon: <ScheduleFilled />,
    icon: <Icon icon={'csHome'} />,
    component: '../Home',
  },
  {
    noAuth: true,
    path: '/cs/powerStation',
    name: '我的电站',
    icon: <Icon icon="powerStation" />,
    component: '../Home',
  },
  {
    noAuth: true,
    path: '/cs/msgList',
    authKey: '',
    name: '消息列表',
    icon: <ScheduleFilled />,
    icon: <Icon icon={'msgList'} />,
    component: '../pages/cs/PowerStation',
    routes: [
      {
        path: '/cs/alarmNotify',
        authKey: '',
        name: '告警通知',
        // icon: placeIcon,
        component: '../pages/cs/PowerStation',
      },
      {
        path: '/cs/systemNotify',
        authKey: '',
        name: '系统通知',
        // icon: placeIcon,
        component: '../pages/cs/ClientReport',
      },
    ],
  },
  {
    noAuth: true,
    path: '/cs/clientReport',
    authKey: '',
    name: '客户报告',
    icon: <Icon icon={'csClientReport'} />,
    component: '../pages/cs/CsClientReport',
  },
  {
    noAuth: true,
    path: '/cs/inspectRecord',
    authKey: '',
    name: '巡检记录',
    // icon: <ScheduleFilled />,
    icon: <Icon icon={'csInspectRecord'} />,
    component: '../pages/om/InspectRecord',
  },
  {
    noAuth: true,
    path: '/cs/bussniessRecord',
    authKey: '',
    name: '业务记录',
    // icon: <ScheduleFilled />,
    icon: <Icon icon={'bussniessRecord'} />,
    component: '../pages/om/InspectRecord',
  },
  {
    noAuth: true,
    path: '/cs/userCenter',
    authKey: '',
    name: '个人中心',
    icon: <ScheduleFilled />,
    icon: <Icon icon={'csUserCenter'} />,
    component: '../pages/csUserCenter',
  },
  {
    noAuth: true,
    path: '/cs/organize',
    authKey: '',
    name: '组织管理',
    icon: <ScheduleFilled />,
    icon: <Icon icon={'csOrganize'} />,
    component: '../pages/cs/csOrganize',
  },
];

export const csRoutes = {
  route: {
    path: '/',
    routes: customerRoutes,
  },
  location: {
    pathname: '/',
  },
};

export default {
  route: {
    path: '/',
    routes: [],
  },
  location: {
    pathname: '/',
  },
};
