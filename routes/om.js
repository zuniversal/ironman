export default [
  {
    path: '/om/appraise',
    authKey: 'assessmentEvaluate',
    component: '@/pages/om/Appraise',
    title: '考核评价',
  },
  {
    path: '/om/assessment',
    authKey: 'assessmentConfig',
    component: '@/pages/om/Assessment',
    title: '考核配置',
  },
  {
    path: '/om/onlineService',
    authKey: 'onlineCustomerService',
    component: '@/pages/om/OnlineService',
    title: '在线客服',
  },
  {
    path: '/om/visitManage',
    authKey: 'returnVisit',
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
    path: '/om/client',
    authKey: 'customer',
    component: '@/pages/om/Client',
    title: '客户管理',
  },
  {
    path: '/om/contract',
    authKey: 'contract',
    component: '@/pages/om/Contract',
    title: '合同管理',
  },
  {
    path: '/om/houseno',
    authKey: 'number',
    component: '@/pages/om/HouseNo',
    title: '户号管理',
  },
  {
    path: '/om/assets',
    authKey: 'asset',
    component: '@/pages/om/Assets',
    title: '资产管理',
  },
  {
    path: '/om/powerStation',
    authKey: 'powerStation',
    component: '@/pages/om/PowerStation',
    title: '电站管理',
  },
  {
    path: '/om/clientReport',
    authKey: 'report',
    component: '@/pages/om/ClientReport',
    title: '客户报告',
  },

  {
    path: '/om/shiftsManage/:id',
    authKey: 'teamManagement',
    component: '@/pages/om/ShiftsManage',
    title: '班组管理2',
  },
  {
    path: '/om/shiftsManage',
    authKey: 'teamManagement',
    component: '@/pages/om/ShiftsManage',
    title: '班组管理',
  },
  {
    path: '/om/shiftsArrange',
    authKey: 'teamSchedule',
    component: '@/pages/om/ShiftsArrange',
    title: '排班',
  },
  {
    path: '/om/shiftsArrangeDetail',
    authKey: 'teamSchedule',
    component: '@/pages/om/ShiftsArrangeDetail',
    title: '新增/编辑排班',
  },
  {
    path: '/om/shiftsTransfer',
    authKey: 'taskHandover',
    component: '@/pages/om/ShiftsTransfer',
    title: '交接班',
  },

  {
    path: '/om/monitorManage',
    authKey: 'monitorEquipment',
    component: '@/pages/om/MonitorManage',
    title: '监测管理',
  },
  {
    path: '/om/goods',
    authKey: 'materiel',
    component: '@/pages/om/Goods',
    title: '物料管理',
  },

  {
    path: '/om/missionsManage',
    authKey: 'task',
    component: '@/pages/om/MissionsManage',
    title: '任务管理',
  },
  {
    path: '/om/workOrder',
    authKey: 'order',
    component: '@/pages/om/WorkOrder',
    title: '工单管理',
  },

  {
    path: '/om/inspectPlan',
    authKey: 'inspectionPlan',
    component: '@/pages/om/InspectPlan',
    title: '巡检计划',
  },
  {
    path: '/om/inspectMission',
    authKey: 'inspectionTask',
    component: '@/pages/om/InspectMission',
    title: '巡检任务',
  },
  {
    path: '/om/inspectRecord',
    authKey: 'inspectionRecord',
    component: '@/pages/om/InspectRecord',
    title: '巡检记录',
  },
  {
    path: '/om/weak',
    authKey: 'defect',
    component: '@/pages/om/Weak',
    title: '缺陷管理',
  },

  {
    path: '/om/alarmTemplate',
    authKey: 'alarmTemplate',
    component: '@/pages/om/AlarmTemplate',
    title: '告警模板',
  },
  {
    path: '/om/alarmRecord',
    authKey: 'alarmRecord',
    component: '@/pages/om/AlarmRecord',
    title: '告警记录',
  },

  {
    path: '/om/newsKnow',
    authKey: 'newsAndKnowledgePoint',
    component: '@/pages/om/NewsKnow',
    title: '新闻与知识点',
  },
  {
    path: '/om/knowledgeCate',
    authKey: 'knowledgeBase',
    component: '@/pages/om/KnowledgeCate',
    title: '知识库分类',
  },
];
