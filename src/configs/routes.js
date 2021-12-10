import React from 'react';
import { TabletOutlined, ScheduleFilled } from '@ant-design/icons';
import Icon from '@/components/Widgets/Icons';
import { LogoutOutlined, SwapOutlined } from '@ant-design/icons';
import SearchForm from '@/common/SearchForm';
import { isDev } from '@/constants';
import { getItem } from '@/utils';

const placeIcon = <Icon icon={''} className={'subIcon'} />;

export const CRM = 'crm';
export const PLATFORM = 'base';
export const DEF_BUSSNIESS_TAB = 'bp';

export const isPlatform = platform => getItem('platform') === platform;
export const isPlatformCRM = (platform = CRM) => isPlatform(platform);

export const platformMap = {
  manager: DEF_BUSSNIESS_TAB,
  customer: 'cs',
};

export const customerInformation = {
  platform: 'base',
  path: '/om/clientInfo',
  authKey: 'customerInformationModel',
  name: '客户信息管理',
  icon: <Icon icon={'clientInfoManage'} />,
  routes: [
    {
      path: '/om/contract',
      authKey: 'contractModel',
      name: '合同管理',
      // icon: <Icon icon={'contract'} />,
      // icon: placeIcon,
    },
    {
      path: '/om/client',
      authKey: 'customerModel',
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
      authKey: 'numberModel',
      name: '户号管理',
      // icon: <Icon icon={'houseNo'} />,
      // icon: placeIcon,
    },
    {
      path: '/om/powerStation',
      authKey: 'powerStationModel',
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
  path: '/om/carManage',
  authKey: 'carManageModel',
  authKey: 'carInfoModel',
  name: '车辆管理',
  icon: <Icon icon={'systemManage'} />,
};

export const system = {
  platform: 'base',
  path: '/system',
  authKey: 'systemModel',
  name: '系统管理',
  name: '集团管理',
  icon: <Icon icon={'systemManage'} />,
  routes: [
    {
      path: '/sm/userManage',
      authKey: 'userModel',
      name: '用户管理',
      // icon: <Icon icon={'userManage'} />,
      // icon: placeIcon,
    },
    {
      path: '/sm/organize',
      authKey: 'organizationModel',
      name: '组织管理',
      // icon: <Icon icon={'organize'} />,
      // icon: placeIcon,
    },
    {
      path: '/sm/role',
      authKey: 'roleModel',
      name: '角色管理',
      // icon: <Icon icon={'role'} />,
      // icon: placeIcon,
    },
    {
      path: '/sm/dict',
      authKey: 'dictionaryModel',
      name: '字典管理',
      // icon: <Icon icon={'dict'} />,
      // icon: placeIcon,
    },
    {
      path: '/sm/msg',
      authKey: 'messageModel',
      name: '消息管理',
      // icon: <Icon icon={'msg'} />,
      // icon: placeIcon,
    },
    {
      path: '/sm/csMonitor',
      authKey: 'sysMonitorModel',
      name: '系统监控',
      // icon: <Icon icon={'csMonitor'} />,
      // icon: placeIcon,
    },
    {
      path: '/sm/operateRecord',
      authKey: 'operationRecordModel',
      name: '操作记录',
      // icon: <Icon icon={'operateRecord'} />,
      // icon: placeIcon,
    },
  ],
};

export const monitor = {
  platform: 'iot',
  authKey: 'powerMonitorManageModel',
  // name: '监控管理',
  name: '电力监控管理',
  icon: <Icon icon={'alarmManage'} />,
  routes: [
    {
      authKey: 'monitorApprovalModel',
      path: '/om/monitorApproval',
      name: '监控审批单',
    },
    {
      authKey: 'monitorPointManageModel',
      path: '/om/monitorManage',
      name: '监控设备管理',
      name: '监控点位管理',
      // icon: <Icon icon={'monitorManage'} />,
      // icon: placeIcon,
    },
    {
      authKey: 'monitorDevicesModel',
      path: '/om/monitorDevice',
      name: '监控设备',
    },
    {
      authKey: 'alarmTemplateModel',
      path: '/om/alarmTemplate',
      name: '告警策略模板',
    },
  ],
};

export const basePlatformRoutes = [
  customerInformation,
  carManage,
  monitor,
  system,
];

export const bpRoutes = [
  {
    // platform: 'bp',
    // path: '/om/client',
    // authKey: 'customer',
    // name: '托管客户',
    // icon: <Icon icon={'systemManage'} />,
    // routes: [],
    platform: 'bp',
    authKey: 'trusteeshipCustomerModel',
    path: '/om/trustClient',
    name: '托管客户',
    icon: <Icon icon={'systemManage'} />,
  },
  {
    platform: 'bussniess',
    platform: 'bp',
    authKey: 'inspectionOperationManageModel',
    path: '/om/operation',
    name: '巡检运维',
    icon: <Icon icon={'inspect'} />,
    routes: [
      {
        authKey: 'inspectionPlanModel',
        path: '/om/inspectPlan',
        name: '巡检计划',
        // icon: placeIcon,
      },
      {
        authKey: 'inspectionTaskModel',
        path: '/om/inspectMission',
        name: '巡检任务',
        // icon: placeIcon,
      },
      {
        authKey: 'inspectionRecordModel',
        path: '/om/inspectRecord',
        name: '巡检记录',
        // icon: placeIcon,
      },
      {
        authKey: 'defectModel',
        path: '/om/weak',
        name: '缺陷管理',
        // icon: placeIcon,
      },
    ],
  },
  {
    platform: 'bussniess',
    platform: 'bp',
    authKey: 'businessManageModel',
    path: '/om/ps',
    name: '业务管理',
    icon: <Icon icon={'bussniessManage'} />,
    routes: [
      {
        authKey: 'materielModel',
        path: '/om/goods',
        name: '物料管理',
        // icon: <Icon icon={'goods'} />,
        // icon: placeIcon,
      },
      {
        authKey: 'taskModel',
        path: '/om/missionsManage',
        name: '任务管理',
        // icon: <Icon icon={'missionsManage'} />,
        // icon: placeIcon,
      },
      {
        authKey: 'orderModel',
        path: '/om/workOrder',
        name: '工单管理',
        // icon: <Icon icon={'workOrder'} />,
        // icon: placeIcon,
      },
    ],
  },
  {
    // icon: <Icon icon={'systemManage'} />,
    // routes: [],
    platform: 'bp',
    authKey: 'reportManageModel',
    authKey: 'reportModel',
    // noAuth: true,
    path: '/om/clientReport',
    name: '报告管理',
    icon: <Icon icon={'systemManage'} />,
  },
  // {
  //   platform: 'bp',
  //   authKey: 'reportModel',
  //   path: '/om/groupReport',
  //   name: '集团报告',
  //   icon: <Icon icon={'systemManage'} />,
  // },
  {
    platform: 'bussniess',
    platform: 'bp',
    authKey: 'assetManageModel',
    path: '/om/as',
    name: '资产管理',
    icon: <Icon icon={'bussniessManage'} />,
    routes: [
      {
        platform: 'bp',
        authKey: 'assetModel',
        path: '/om/assets',
        name: '资产管理',
        routes: [],
      },
      {
        hideInMenu: true,
        platform: 'bp',
        authKey: 'assetModel',
        path: '/om/assetsDetail',
        name: '资产详情',
        routes: [],
      },
      {
        platform: 'bp',
        authKey: 'assetModel',
        path: '/om/assetsList',
        name: '资产清单',
        routes: [],
      },
    ],
  },
  {
    platform: 'bp',
    authKey: 'alarmRecordModel',
    path: '/om/alarmRecord',
    name: '告警记录',
    icon: <Icon icon={'shiftsManage'} />,
  },
  {
    platform: 'smartEfficiency',
    path: '/om/能效客户',
    noAuth: true,
    name: '能效客户',
    icon: <Icon icon={'bussniessManage'} />,
    routes: [],
  },
  {
    platform: 'bussniess',
    platform: 'bp',
    haveDetail: true,
    authKey: 'teamManageModel',
    path: '/om/shifts',
    name: '班组管理',
    icon: <Icon icon={'shiftsManage'} />,
    routes: [
      {
        authKey: 'teamModel',
        path: '/om/shiftsManage',
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
        authKey: 'teamScheduleModel',
        path: '/om/shiftsArrange',
        name: '排班',
        // icon: placeIcon,
      },
      {
        hideInMenu: true,
        hide: true,
        // path: '/om/shiftsArrange',
        authKey: 'teamScheduleModel',
        path: '/om/shiftsArrangeDetail',
        name: '新增/编辑排班',
        // icon: placeIcon,
      },
      // {
      //   path: '/om/shiftsArrange/shiftsArrangeDetail',
      //   name: '排班',
      // },
      {
        authKey: 'taskHandoverModel',
        path: '/om/shiftsTransfer',
        name: '交接班',
        // icon: placeIcon,
      },
    ],
  },
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
    authKey: 'ICCIDManageModel',
    authKey: 'ICCIDModel',
    path: '/om/iotAccount',
    icon: <Icon icon={'systemManage'} />,
    name: '物联网卡台账',
  },
  {
    platform: 'iot',
    authKey: 'monitorVideoManageModel',
    // authKey: 'monitorVideoModel',
    path: '/视频监控管理',
    name: '视频监控管理',
    icon: <Icon icon={'systemManage'} />,
    routes: [
      {
        path: '/sm/cameraConfig',
        authKey: 'customerModel',
        // noAuth: true,
        component: '@/pages/sm/CameraConfig',
        name: '摄像头配置',
      },
      {
        path: '/sm/platformConfig',
        authKey: 'customerModel',
        // noAuth: true,
        component: '@/pages/sm/PlatformConfig',
        name: '平台配置',
      },
    ],
  },
  {
    platform: 'iot',
    authKey: 'inspectionRobotManageModel',
    authKey: 'inspectionRobotModel',
    path: 'iot/inspectRobot',
    name: '巡检机器人',
    icon: <Icon icon={'systemManage'} />,
    routes: [],
  },
  {
    platform: 'iot',
    authKey: 'otherIOTDevicesManageModel',
    authKey: 'otherIOTDevicesModel',
    path: 'iot/otherIOT',
    name: '其他loT设备',
    icon: <Icon icon={'systemManage'} />,
    routes: [],
  },
  {
    platform: 'iot',
    authKey: 'alarmRecordModel',
    path: '/iot/alarmRecord',
    name: '告警记录',
    icon: <Icon icon={'shiftsManage'} />,
  },
];

export const crmRoutes = [
  {
    platform: 'crm',
    authKey: 'CRMCustomerManageModel',
    // hideInMenu: false,
    name: '客户管理',
    icon: <Icon icon={'clientManage'} />,
    routes: [
      {
        platform: 'crm',
        authKey: 'CRMCustomerModel',
        // hideInMenu: false,
        path: '/crm/clientList',
        name: '客户列表',
      },
      {
        platform: 'crm',
        authKey: 'CRMCustomerClueModel',
        // hideInMenu: false,
        path: '/crm/clientClue',
        name: '客户线索',
      },
      {
        platform: 'crm',
        authKey: 'CRMCustomerPortraitModel',
        // hideInMenu: false,
        path: '/crm/clientPortrait',
        name: '客户画像',
      },
      // {
      //   platform: 'crm',
      //   authKey: 'customerModel',
      //   hideInMenu: false,
      //   path: '/crm/clientLevel',
      //   name: '客户等级',
      // },
    ],
  },
  {
    platform: 'crm',
    authKey: 'CRMTaskManageModel',
    // hideInMenu: false,
    name: '任务管理',
    icon: <Icon icon={'taskManage'} />,
    routes: [
      {
        platform: 'crm',
        authKey: 'CRMTaskModel',
        // hideInMenu: false,
        path: '/crm/myTask',
        name: '我的任务',
      },
      {
        platform: 'crm',
        authKey: 'CRMTaskApproveModel',
        // hideInMenu: false,
        path: '/crm/approvalMangement',
        name: '审批管理',
      },
    ],
  },
  {
    platform: 'crm',
    authKey: 'CRMStatisticsModel',
    // hideInMenu: false,
    name: '统计分析',
    icon: <Icon icon={'satisAnalyse'} />,
    routes: [
      {
        platform: 'crm',
        authKey: 'CRMConversionRateModel',
        // hideInMenu: false,
        path: '/crm/turnRate',
        name: '转化率',
      },
      {
        platform: 'crm',
        authKey: 'CRMSaleDataModel',
        // hideInMenu: false,
        path: '/crm/saleData',
        name: '销售数据',
      },
      // {
      //   platform: 'crm',
      //   authKey: 'customerModel',
      //   hideInMenu: false,
      //   path: '/crm/satisfactionDegree',
      //   name: '满意度',
      // },
      {
        platform: 'crm',
        authKey: 'CRMSaleClueModel',
        // hideInMenu: false,
        path: '/crm/saleClue',
        name: '销售线索',
      },
    ],
  },
  {
    platform: 'crm',
    authKey: 'CRMSaleUserManageModel',
    // hideInMenu: false,
    name: '营销人员管理',
    icon: <Icon icon={'salesManage'} />,
    routes: [
      {
        platform: 'crm',
        authKey: 'CRMSaleUserModel',
        // hideInMenu: false,
        path: '/crm/salemanMangement',
        name: '营销人员管理',
      },
      {
        platform: 'crm',
        authKey: 'CRMClockInModel',
        // hideInMenu: false,
        path: '/crm/signRecord',
        name: '打卡记录',
      },
      {
        platform: 'crm',
        authKey: 'CRMCustomerMessageModel',
        // hideInMenu: false,
        path: '/crm/clientInfoNotify',
        name: '客户信息通知',
      },
    ],
  },
];

export const homeRoutes = [
  {
    hideInMenu: isPlatformCRM,
    cb: isPlatformCRM,
    noAuth: true,
    path: '/om/home',
    name: '首页',
    icon: <Icon icon={'home'} />,
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

  ...homeRoutes,

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

  ...basePlatformRoutes,
  ...bpRoutes,
  ...iotRoutes,
  ...crmRoutes,

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
    name: '用能概况',
    name: '首页',
    icon: <Icon icon={'home'} />,
  },
  {
    noAuth: true,
    hideInMenu: false,
    name: '能源监控',
    icon: <Icon icon={'alarmManage'} />,
    routes: [
      {
        noAuth: true,
        path: '/cs/electricInfo',
        name: '电气信息',
        // icon: <Icon icon={'csOrganize'} />,
      },
      {
        noAuth: true,
        path: '/cs/alarmNotify',
        name: '告警通知',
        name: '监控告警',
        // icon: <Icon icon={'msgList'} />,
      },
    ],
  },
  {
    noAuth: true,
    hideInMenu: false,
    name: '电站管理',
    icon: <Icon icon={'systemManage'} />,
    routes: [
      {
        noAuth: true,
        path: '/cs/powerStation',
        name: '我的电站',
        // icon: <Icon icon="powerStation" />,
      },
      {
        noAuth: true,
        path: '/cs/assets',
        name: '资产管理',
        // icon: <Icon icon={'csOrganize'} />,
      },
      {
        noAuth: true,
        path: '/cs/inspectRecord',
        name: '巡检记录',
        // icon: <Icon icon={'csInspectRecord'} />,
      },
      {
        noAuth: true,
        path: '/cs/bussniessRecord',
        name: '业务记录',
        // icon: <Icon icon={'bussniessRecord'} />,
      },
    ],
  },

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
    noAuth: true,
    path: '/cs/clientReport',
    name: '客户报告',
    name: '我的报告',
    name: '分析报告',
    icon: <Icon icon={'csClientReport'} />,
  },
  {
    noAuth: true,
    path: '/cs/userCenter',
    path: '/om/userCenter',
    name: '个人中心',
    icon: <Icon icon={'csUserCenter'} />,
  },
  // {
  //   noAuth: true,
  //   path: '/cs/organize',
  //   name: '组织管理',
  //   icon: <Icon icon={'csOrganize'} />,
  // },
  // {
  //   path: '/cs/systemNotify',
  //   name: '系统通知',
  //   icon: <Icon icon={'msgList'} />,
  // },
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

export const platformSelectConfig = [
  {
    value: 'base',
    label: '基础数据平台',
    name: '基础数据平台',
    authKey: 'basicDataPlatform',
    routes: basePlatformRoutes,
  },
  {
    value: 'iot',
    label: 'IoT平台',
    name: 'IoT平台',
    authKey: 'IOTPlatform',
    routes: iotRoutes,
  },
  {
    value: 'bp',
    label: '业务平台',
    name: '业务平台',
    authKey: 'businessPlatform',
    routes: bpRoutes,
  },
];

// if (isDev) {
// if (window.location.protocol === 'http:') {
platformSelectConfig.push({
  value: CRM,
  label: 'CRM平台',
  name: 'CRM平台',
  authKey: 'CRMPlatform',
  routes: crmRoutes,
});
// }

export const bussniessTabConfig = [
  {
    value: 'bp',
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

export default {
  route: {
    path: '/',
    routes: [],
  },
  location: {
    pathname: '/',
  },
};
