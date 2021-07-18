export default [
  {
    path: '/om/drawPanel',
    component: '@/pages/om/DrawPanel',
    title: '一次系统图',
  },

  {
    path: '/om/appraise',
    component: '@/pages/om/Appraise',
    title: '考核评价',
  },
  {
    path: '/om/assessment',
    component: '@/pages/om/Assessment',
    title: '考核配置',
  },
  {
    path: '/om/onlineService',
    component: '@/pages/om/OnlineService',
    title: '在线客服',
  },
  {
    path: '/om/visitManage',
    authKey: 'returnVisitModel',
    component: '@/pages/om/VisitManage',
    title: '回访管理',
  },

  {
    path: '/om/home',
    authKey: '',
    component: '@/pages/om/Home',
    title: '首页',
  },
  {
    path: '/om/userCenter',
    authKey: '',
    component: '@/pages/om/UserCenter',
    title: '个人中心',
  },
  {
    path: '/om/trustClient',
    authKey: 'trusteeshipCustomerModel',
    component: '@/pages/om/TrustClient',
    title: '托管客户',
  },
  {
    path: '/om/client',
    authKey: 'customerModel',
    component: '@/pages/om/Client',
    title: '客户管理',
  },
  {
    path: '/om/contract',
    authKey: 'contractModel',
    component: '@/pages/om/Contract',
    title: '合同管理',
  },
  {
    path: '/om/houseno',
    authKey: 'numberModel',
    component: '@/pages/om/HouseNo',
    title: '户号管理',
  },
  {
    path: '/om/assets',
    authKey: 'assetManageModel',
    component: '@/pages/om/Assets',
    title: '资产管理',
  },
  {
    path: '/om/assetsDetail',
    authKey: 'assetManageModel',
    component: '@/pages/om/AssetsDetail',
    title: '资产详情',
  },
  {
    path: '/om/assetsList',
    authKey: 'assetManageModel',
    component: '@/pages/om/AssetsList',
    title: '资产管理',
  },
  {
    path: '/om/powerStation',
    authKey: 'powerStationModel',
    component: '@/pages/om/PowerStation',
    title: '电站管理',
  },
  {
    path: '/om/powerStation/smartMonitor/:stationId',
    authKey: '',
    component: '@/pages/om/SmartMonitor',
    title: '智能监控',
  },
  {
    path: '/om/clientReport',
    authKey: '',
    component: '@/pages/om/ClientReport',
    title: '客户报告',
  },
  {
    path: '/om/groupReport',
    authKey: '',
    component: '@/pages/om/GroupReport',
    title: '集团报告',
  },

  // {
  //   path: '/om/shiftsManage/:id',
  //   authKey: 'teamManagementModel',
  //   component: '@/pages/om/ShiftsManage',
  //   title: '班组管理2',
  // },
  {
    path: '/om/shiftsManage',
    authKey: 'teamModel',
    component: '@/pages/om/ShiftsManage',
    title: '班组管理',
  },
  {
    path: '/om/shiftsArrange',
    authKey: 'teamScheduleModel',
    component: '@/pages/om/ShiftsArrange',
    title: '排班',
  },
  {
    path: '/om/shiftsArrangeDetail',
    authKey: 'teamScheduleModel',
    component: '@/pages/om/ShiftsArrangeDetail',
    title: '新增/编辑排班',
  },
  {
    path: '/om/shiftsTransfer',
    authKey: 'taskHandoverModel',
    component: '@/pages/om/ShiftsTransfer',
    title: '交接班',
  },

  {
    path: '/om/iotAccount',
    authKey: 'ICCIDModel',
    component: '@/pages/om/IotAccount',
    title: '物联网卡台账',
  },
  {
    path: '/om/monitorApproval',
    authKey: 'monitorApprovalModel',
    component: '@/pages/om/MonitorApproval',
    title: '监控审批单',
  },
  {
    path: '/om/monitorManage',
    authKey: 'monitorPointManageModel',
    component: '@/pages/om/MonitorManage',
    title: '监控点位管理',
  },
  {
    path: '/om/monitorDevice',
    authKey: 'monitorDevicesModel',
    component: '@/pages/om/MonitorDevice',
    title: '监控设备',
  },
  {
    path: '/om/goods',
    authKey: 'materielModel',
    component: '@/pages/om/Goods',
    title: '物料管理',
  },

  {
    path: '/om/missionsManage',
    authKey: 'taskModel',
    component: '@/pages/om/MissionsManage',
    title: '任务管理',
  },
  {
    path: '/om/workOrder',
    authKey: 'orderModel',
    component: '@/pages/om/WorkOrder',
    title: '工单管理',
  },

  {
    path: '/om/inspectPlan',
    authKey: 'inspectionPlanModel',
    component: '@/pages/om/InspectPlan',
    title: '巡检计划',
  },
  {
    path: '/om/inspectMission',
    authKey: 'inspectionTaskModel',
    component: '@/pages/om/InspectMission',
    title: '巡检任务',
  },
  {
    path: '/om/inspectRecord',
    authKey: 'inspectionRecordModel',
    component: '@/pages/om/InspectRecord',
    title: '巡检记录',
  },
  {
    path: '/om/weak',
    authKey: 'defectModel',
    component: '@/pages/om/Weak',
    title: '缺陷管理',
  },

  {
    path: '/om/alarmTemplate',
    authKey: 'alarmTemplateModel',
    component: '@/pages/om/AlarmTemplate',
    title: '告警策略模板',
  },
  {
    path: '/om/alarmRecord',
    authKey: 'alarmRecordModel',
    component: '@/pages/om/AlarmRecord',
    title: '告警记录',
  },
  {
    path: '/iot/alarmRecord',
    authKey: 'alarmRecordModel',
    component: '@/pages/om/AlarmRecord',
    title: '告警记录',
  },

  {
    path: '/om/newsKnow',
    authKey: 'newsAndKnowledgePointModel',
    component: '@/pages/om/NewsKnow',
    title: '新闻与知识点',
  },
  {
    path: '/om/knowledgeCate',
    authKey: 'knowledgeBaseModel',
    component: '@/pages/om/KnowledgeCate',
    title: '知识库分类',
  },
];
