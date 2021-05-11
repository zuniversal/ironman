import React from 'react';
import { TabletOutlined, ScheduleFilled } from '@ant-design/icons';
import Icon from '@/components/Widgets/Icons';
import { LogoutOutlined, SwapOutlined } from '@ant-design/icons';
import SearchForm from '@/common/SearchForm';

const placeIcon = <Icon icon={''} className={'subIcon'} />;

export const PLATFORM = 'base';
export const DEF_BUSSNIESS_TAB = 'smartOMS';

export const platformMap = {
  manager: DEF_BUSSNIESS_TAB,
  customer: 'cs',
};

export const platformSelectConfig = [
  {
    value: 'base',
    label: '基础数据平台',
  },
  {
    value: 'iot',
    label: 'IoT平台',
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
    // disable: 'cs',
  },
  {
    value: 'smartEfficiency',
    label: '智慧能效',
    disable: 'cs',
  },
  {
    value: 'powerGrid',
    label: '微电网',
    disable: 'cs',
  },
];

export const isSmartOMS = val => bussniessTabConfig.some(v => v.value == val);
export const plaformFormat = val => (isSmartOMS(val) ? DEF_BUSSNIESS_TAB : val);

export const customerInformation = {
  platform: 'base',
  path: '/om/clientInfo',
  authKey: 'customerInformation',
  name: '客户信息管理',
  icon: <Icon icon={'clientInfoManage'} />,
  routes: [
    {
      path: '/om/contract',
      authKey: 'contract',
      name: '合同管理',
      // icon: <Icon icon={'contract'} />,
      // icon: placeIcon,
    },
    {
      path: '/om/client',
      authKey: 'customer',
      name: '客户管理',
      // icon: <Icon icon={'client'} />,
      // icon: placeIcon,
    },
    // {
    //   path: '/om/assets',
    //   authKey: 'asset',
    //   name: '资产管理',
    //   // icon: <Icon icon={'assets'} />,
    //   // icon: placeIcon,
    // },
    {
      path: '/om/houseNo',
      authKey: 'number',
      name: '户号管理',
      // icon: <Icon icon={'houseNo'} />,
      // icon: placeIcon,
    },
    {
      path: '/om/powerStation',
      authKey: 'powerStation',
      name: '电站管理',
      // icon: <Icon icon={'powerStation'} />,
      // icon: placeIcon,
    },
    // {
    //   path: '/om/clientReport',
    //   authKey: 'report',
    //   name: '客户报告',
    //   // icon: <Icon icon={'powerStation'} />,
    //   // icon: placeIcon,
    // },
  ],
};

export const carManage = {
  platform: 'base',
  path: '/carManage',
  authKey: 'system',
  name: '车辆管理',
  icon: <Icon icon={'systemManage'} />,
  routes: [
    {
      path: '/om/敬请期待1',
      authKey: 'materiel',
      name: '敬请期待',
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
  routes: [
    {
      path: '/sm/userManage',
      authKey: 'user',
      name: '用户管理',
      // icon: <Icon icon={'userManage'} />,
      // icon: placeIcon,
    },
    {
      path: '/sm/organize',
      authKey: 'organization',
      name: '组织管理',
      // icon: <Icon icon={'organize'} />,
      // icon: placeIcon,
    },
    {
      path: '/sm/role',
      authKey: 'role',
      name: '角色管理',
      // icon: <Icon icon={'role'} />,
      // icon: placeIcon,
    },
    {
      path: '/sm/dict',
      authKey: 'dictionary',
      name: '字典管理',
      // icon: <Icon icon={'dict'} />,
      // icon: placeIcon,
    },
    {
      path: '/sm/msg',
      authKey: 'message',
      name: '消息管理',
      // icon: <Icon icon={'msg'} />,
      // icon: placeIcon,
    },
    {
      path: '/sm/csMonitor',
      authKey: 'monitor',
      name: '系统监控',
      // icon: <Icon icon={'csMonitor'} />,
      // icon: placeIcon,
    },
    {
      path: '/sm/operateRecord',
      authKey: 'operationRecord',
      name: '操作记录',
      // icon: <Icon icon={'operateRecord'} />,
      // icon: placeIcon,
    },
  ],
};

export const monitor = {
  platform: 'iot',
  path: '/om/alarm',
  // name: '监控管理',
  name: '电力监控管理',
  icon: <Icon icon={'alarmManage'} />,
  routes: [
    {
      noAuth: true,
      path: '/om/monitorApproval',
      name: '监控审批单',
    },
    {
      noAuth: true,
      path: '/om/monitorManage',
      name: '监控设备管理',
      name: '监控点位管理',
      // icon: <Icon icon={'monitorManage'} />,
      // icon: placeIcon,
    },
    {
      noAuth: true,
      path: '/om/monitorDevice',
      name: '监控设备',
    },
    {
      noAuth: true,
      path: '/om/alarmTemplate',
      name: '告警策略模板',
    },
    {
      noAuth: true,
      path: '/om/alarmRecord',
      name: '告警记录',
      // icon: placeIcon,
    },
  ],
};

export const smartOMS1 = {
  platform: 'bussniess',
  platform: 'smartOMS',
  path: '/om/operation',
  authKey: 'inspection',
  name: '巡检运维',
  icon: <Icon icon={'inspect'} />,
  routes: [
    {
      path: '/om/inspectPlan',
      authKey: 'inspectionPlan',
      name: '巡检计划',
      // icon: placeIcon,
    },
    {
      path: '/om/inspectMission',
      authKey: 'inspectionTask',
      name: '巡检任务',
      // icon: placeIcon,
    },
    {
      path: '/om/inspectRecord',
      authKey: 'inspectionRecord',
      name: '巡检记录',
      // icon: placeIcon,
    },
    {
      path: '/om/weak',
      authKey: 'defect',
      name: '缺陷管理',
      // icon: placeIcon,
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
  icon: <Icon icon={'shiftsManage'} />,
  routes: [
    {
      path: '/om/shiftsManage',
      authKey: 'teamManagement',
      name: '班组管理',
      // icon: placeIcon,
    },
    // {
    //   path: '/om/shiftsManage/111',
    //   authKey: 'teamManagement',
    //   name: '班组管理2',
    //   // icon: placeIcon,
    // },
    {
      path: '/om/shiftsArrange',
      authKey: 'teamSchedule',
      name: '排班',
      // icon: placeIcon,
    },
    {
      hideInMenu: true,
      hide: true,
      // path: '/om/shiftsArrange',
      path: '/om/shiftsArrangeDetail',
      authKey: 'teamSchedule',
      name: '新增/编辑排班',
      // icon: placeIcon,
    },
    // {
    //   path: '/om/shiftsArrange/shiftsArrangeDetail',
    //   name: '排班',
    // },
    {
      path: '/om/shiftsTransfer',
      authKey: 'taskHandover',
      name: '交接班',
      // icon: placeIcon,
    },
  ],
};

export const smartOMS3 = {
  platform: 'bussniess',
  platform: 'smartOMS',
  path: '/om/ps',
  authKey: 'business',
  name: '业务管理',
  icon: <Icon icon={'bussniessManage'} />,
  routes: [
    {
      path: '/om/goods',
      authKey: 'materiel',
      name: '物料管理',
      // icon: <Icon icon={'goods'} />,
      // icon: placeIcon,
    },
    {
      path: '/om/missionsManage',
      authKey: 'task',
      name: '任务管理',
      // icon: <Icon icon={'missionsManage'} />,
      // icon: placeIcon,
    },
    {
      path: '/om/workOrder',
      authKey: 'order',
      name: '工单管理',
      // icon: <Icon icon={'workOrder'} />,
      // icon: placeIcon,
    },
  ],
};

export const smartOMS4 = {
  // platform: 'smartOMS',
  // path: '/om/client',
  // authKey: 'customer',
  // name: '托管客户',
  // icon: <Icon icon={'systemManage'} />,
  // routes: [],
  platform: 'smartOMS',
  path: '/om/client',
  authKey: 'customer',
  name: '托管客户',
  icon: <Icon icon={'systemManage'} />,
};

export const smartOMS5 = {
  platform: 'smartOMS',
  // path: '/smartOMS5',
  // authKey: 'system',
  // name: '报告管理',
  // icon: <Icon icon={'systemManage'} />,
  // routes: [],
  platform: 'smartOMS',
  noAuth: true,
  path: '/om/clientReport',
  authKey: '',
  name: '报告管理',
  icon: <Icon icon={'systemManage'} />,
};

export const smartOMS6 = {
  platform: 'smartOMS',
  path: '/om/assets',
  authKey: 'asset',
  name: '资产管理',
  icon: <Icon icon={'systemManage'} />,
  routes: [],
};

export const smartEfficiency = [
  {
    platform: 'smartEfficiency',
    path: '/om/能效客户',
    authKey: 'business',
    name: '能效客户',
    icon: <Icon icon={'bussniessManage'} />,
    routes: [
      {
        path: '/om/敬请期待1',
        authKey: 'materiel',
        name: '敬请期待',
      },
    ],
  },
  {
    platform: 'smartEfficiency',
    path: '/om/报告管理',
    authKey: 'business',
    name: '报告管理',
    icon: <Icon icon={'bussniessManage'} />,
    routes: [
      {
        path: '/om/敬请期待2',
        authKey: 'materiel',
        name: '敬请期待',
      },
    ],
  },
];

export const smartOMS = [
  smartOMS4,
  smartOMS1,
  smartOMS3,
  smartOMS5,
  smartOMS6,
  ...smartEfficiency,
  smartOMS2,
];

export const iotRoutes = [
  // {
  //   platform: 'iot',
  //   path: '/SIM卡管理',
  //   authKey: 'system',
  //   name: 'SIM卡管理',
  //   icon: <Icon icon={'systemManage'} />,
  //   routes: [],
  // },
  {
    platform: 'iot',
    path: '/om/iotAccount',
    icon: <Icon icon={'systemManage'} />,
    name: '物联网卡台账',
  },
  {
    platform: 'iot',
    path: '/视频监控管理',
    name: '视频监控管理',
    icon: <Icon icon={'systemManage'} />,
    routes: [],
  },
  {
    platform: 'iot',
    path: '/巡检机器人',
    name: '巡检机器人',
    icon: <Icon icon={'systemManage'} />,
    routes: [],
  },
  {
    platform: 'iot',
    path: '/其他loT设备',
    name: '其他loT设备',
    icon: <Icon icon={'systemManage'} />,
    routes: [],
  },
];

export const managerRoutes = [
  // {
  //   path: '/dashBoard',
  //   name: '大屏展示',
  // },
  // {
  //   path: '/om/test',
  //   name: '开发测试',
  //   icon: <Icon icon={'test'} />,
  // },

  // {
  //   path: '/login',
  //   name: '登录页',
  //   icon: <Icon icon={'home'} />,
  // },
  {
    noAuth: true,
    path: '/om/home',
    name: '首页',
    icon: <Icon icon={'home'} />,
  },

  // {
  //   noAuth: true,
  //   path: '/om/drawPanel',
  //   name: '一次系统图',
  //   icon: <Icon icon={'home'} />,
  // },

  // {
  //   path: '/om/userCenter',
  //   name: '个人中心',
  //   icon: <Icon icon={'userCenter'} />,
  // },

  customerInformation,
  carManage,

  monitor,
  ...smartOMS,

  ...iotRoutes,

  // {
  //   path: '/kpi',
  //   authKey: 'achievements',
  //   name: '绩效管理',
  //   icon: <Icon icon={'kpiManage'} />,
  //   routes: [
  //     {
  //       path: '/om/appraise',
  //       authKey: 'assessmentEvaluate',
  //       name: '考核评价',
  //       // icon: placeIcon,
  //     },
  //     {
  //       path: '/om/assessment',
  //       authKey: 'assessmentConfig',
  //       name: '考核配置',
  //       // icon: placeIcon,
  //     },
  //   ],
  // },

  // {
  //   path: '/waiter',
  //   authKey: 'customerService',
  //   name: '客服管理',
  //   icon: <Icon icon={'customerManage'} />,
  //   routes: [
  //     {
  //       path: '/om/onlineService',
  //       authKey: 'onlineCustomerService',
  //       name: '在线客服',
  //       // icon: placeIcon,
  //     },
  //     {
  //       path: '/om/visitManage',
  //       authKey: 'returnVisit',
  //       name: '回访管理',
  //       // icon: <Icon icon={'csOrganize'} />,
  //       // icon: placeIcon,
  //     },
  //   ],
  // },

  system,

  // {
  //   path: '/knowledge',
  //   authKey: 'newsAndKnowledge',
  //   name: '新闻与知识点',
  //   icon: <Icon icon={'customerManage'} />,
  //   routes: [
  //     {
  //       path: '/om/newsKnow',
  //       authKey: 'newsAndKnowledgePoint',
  //       name: '新闻与知识点',
  //       // icon: placeIcon,
  //     },
  //     {
  //       path: '/om/knowledgeCate',
  //       authKey: 'knowledgeBase',
  //       name: '知识库分类',
  //       // icon: placeIcon,
  //     },
  //   ],
  // },
];

export const customerRoutes2 = [];
export const customerRoutes = [
  // {
  //   noAuth: true,
  //   path: '/cs/home',
  //   name: '首页',
  //   icon: <Icon icon={'csHome'} />,
  // },
  {
    noAuth: true,
    path: '/cs/energyInfo',
    authKey: '',
    name: '用能概况',
    icon: <Icon icon={'csOrganize'} />,
  },
  {
    noAuth: true,
    path: '/cs/electricInfo',
    authKey: '',
    name: '电气信息',
    icon: <Icon icon={'csOrganize'} />,
  },
  {
    noAuth: true,
    path: '/cs/assets',
    authKey: '',
    name: '资产管理',
    icon: <Icon icon={'csOrganize'} />,
  },

  // {
  //   noAuth: true,
  //   path: '/cs/powerStation',
  //   name: '我的电站',
  //   icon: <Icon icon="powerStation" />,
  // },
  // {
  //   noAuth: true,
  //   path: '/cs/msgList',
  //   authKey: '',
  //   name: '消息列表',
  //   icon: <Icon icon={'msgList'} />,
  //   routes: [
  //   ],
  // },
  {
    path: '/cs/alarmNotify',
    authKey: '',
    name: '告警通知',
    name: '监控告警',
    icon: <Icon icon={'msgList'} />,
  },
  {
    noAuth: true,
    path: '/cs/clientReport',
    authKey: '',
    name: '客户报告',
    name: '我的报告',
    icon: <Icon icon={'csClientReport'} />,
  },
  {
    noAuth: true,
    path: '/cs/inspectRecord',
    authKey: '',
    name: '巡检记录',
    icon: <Icon icon={'csInspectRecord'} />,
  },
  {
    noAuth: true,
    path: '/cs/bussniessRecord',
    authKey: '',
    name: '业务记录',
    icon: <Icon icon={'bussniessRecord'} />,
  },
  {
    noAuth: true,
    path: '/cs/userCenter',
    authKey: '',
    name: '个人中心',
    icon: <Icon icon={'csUserCenter'} />,
  },
  {
    noAuth: true,
    path: '/cs/organize',
    authKey: '',
    name: '组织管理',
    icon: <Icon icon={'csOrganize'} />,
  },
  {
    path: '/cs/systemNotify',
    authKey: '',
    name: '系统通知',
    icon: <Icon icon={'msgList'} />,
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
