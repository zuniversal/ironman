import React from 'react';
import { TabletOutlined, ScheduleFilled } from '@ant-design/icons';
import Icon from '@/components/Widgets/Icons'; //

const placeIcon = <Icon icon={''} className={'subIcon'} />;

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
    path: '/om/home',
    name: '首页',
    icon: <ScheduleFilled />,
    icon: <Icon icon={'home'} />,
    component: '../Home',
  },

  // {
  //   path: '/om/userCenter',
  //   name: '个人中心',
  //   icon: <ScheduleFilled />,
  //   icon: <Icon icon={'userCenter'} />,
  //   component: '../pages/userCenter',
  // },
  {
    path: '/om/shifts',
    name: '班组管理',
    icon: <ScheduleFilled />,
    icon: <Icon icon={'shiftsManage'} />,
    component: '../Shifts',
    routes: [
      {
        path: '/om/shiftsManage',
        name: '班组管理',
        // icon: <ScheduleFilled />,
        // icon: placeIcon,
        component: '../pages/om/ShiftsManage',
      },
      {
        path: '/om/shiftsArrange',
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
        name: '交接班',
        // icon: <ScheduleFilled />,
        // icon: placeIcon,
        component: '../pages/om/ShiftsTransfer',
      },
    ],
  },

  {
    path: '/om/clientInfo',
    name: '客户信息管理',
    icon: <ScheduleFilled />,
    icon: <Icon icon={'clientInfoManage'} />,
    component: '../Shifts',
    routes: [
      {
        path: '/om/contract',
        name: '合同管理',
        // icon: <ScheduleFilled />,
        // icon: <Icon icon={'contract'} />,
        // icon: placeIcon,
        component: '../pages/om/Contract',
      },
      {
        path: '/om/client',
        name: '客户管理',
        // icon: <ScheduleFilled />,
        // icon: <Icon icon={'client'} />,
        // icon: placeIcon,
        component: '../pages/om/Client',
      },
      {
        path: '/om/assets',
        name: '资产管理',
        // icon: <ScheduleFilled />,
        // icon: <Icon icon={'assets'} />,
        // icon: placeIcon,
        component: '../pages/om/Assets',
      },
      {
        path: '/om/houseNo',
        name: '户号管理',
        // icon: <ScheduleFilled />,
        // icon: <Icon icon={'houseNo'} />,
        // icon: placeIcon,
        component: '../pages/om/HouseNo',
      },
      {
        path: '/om/powerStation',
        name: '电站管理',
        // icon: <Icon icon={'powerStation'} />,
        // icon: placeIcon,
        component: '../pages/om/PowerStation',
      },
      {
        path: '/om/clientReport',
        name: '客户报告',
        // icon: <Icon icon={'powerStation'} />,
        // icon: placeIcon,
        component: '../pages/om/ClientReport',
      },
    ],
  },

  {
    path: '/om/ps',
    name: '业务管理',
    icon: <ScheduleFilled />,
    icon: <Icon icon={'bussniessManage'} />,
    component: '../pages/om/PowerStation',
    routes: [
      {
        path: '/om/goods',
        name: '物料管理',
        // icon: <ScheduleFilled />,
        // icon: <Icon icon={'goods'} />,
        // icon: placeIcon,
        component: '../pages/om/Goods',
      },
      {
        path: '/om/missionsManage',
        name: '任务管理',
        // icon: <ScheduleFilled />,
        // icon: <Icon icon={'missionsManage'} />,
        // icon: placeIcon,
        component: '../pages/om/MissionsManage',
      },
      {
        path: '/om/workOrder',
        name: '工单管理',
        // icon: <ScheduleFilled />,
        // icon: <Icon icon={'workOrder'} />,
        // icon: placeIcon,
        component: '../pages/om/Workorder',
      },
    ],
  },

  {
    path: '/om/operation',
    name: '巡检运维',
    icon: <ScheduleFilled />,
    icon: <Icon icon={'inspect'} />,
    component: '../pages/om/Operation',
    routes: [
      {
        path: '/om/inspectPlan',
        name: '巡检计划',
        // icon: <ScheduleFilled />,
        // icon: placeIcon,
        component: '../pages/om/InspectPlan',
      },
      {
        path: '/om/inspectMission',
        name: '巡检任务',
        // icon: <ScheduleFilled />,
        // icon: placeIcon,
        component: '../pages/om/InspectMission',
      },
      {
        path: '/om/inspectRecord',
        name: '巡检记录',
        // icon: <ScheduleFilled />,
        // icon: placeIcon,
        component: '../pages/om/InspectRecord',
      },
      {
        path: '/om/weak',
        name: '缺陷管理',
        // icon: <ScheduleFilled />,
        // icon: placeIcon,
        component: '../pages/om/Weak',
      },
    ],
  },
  {
    path: '/om/alarm',
    name: '告警管理',
    icon: <ScheduleFilled />,
    icon: <Icon icon={'alarmManage'} />,
    component: '../Alarm',
    routes: [
      {
        path: '/om/alarmTemplate',
        name: '告警策略模板',
        // icon: <ScheduleFilled />,
        // icon: placeIcon,
        component: '../pages/om/AlarmTemplate',
      },
      {
        path: '/om/monitorManage',
        name: '监测设备管理',
        // icon: <ScheduleFilled />,
        // icon: <Icon icon={'monitorManage'} />,
        // icon: placeIcon,
        component: '../pages/om/MonitorManage',
      },
      {
        path: '/om/alarmRecord',
        name: '告警记录',
        // icon: <ScheduleFilled />,
        // icon: placeIcon,
        component: '../pages/om/AlarmRecord',
      },
    ],
  },
  {
    path: '/kpi',
    name: '绩效管理',
    icon: <ScheduleFilled />,
    icon: <Icon icon={'kpiManage'} />,
    component: '../Kpi',
    routes: [
      {
        path: '/admin/appraise',
        name: '考核评价',
        // icon: <ScheduleFilled />,
        // icon: placeIcon,
        component: '../Appraise',
      },
      {
        path: '/admin/examine',
        name: '考核配置',
        // icon: <ScheduleFilled />,
        // icon: placeIcon,
        component: '../Examine',
      },
    ],
  },

  {
    path: '/waiter',
    name: '客服管理',
    icon: <Icon icon={'customerManage'} />,
    component: '../Waiter',
    routes: [
      {
        path: '/cs/online',
        name: '在线客服',
        // icon: <ScheduleFilled />,
        // icon: placeIcon,
        component: '../Online',
      },
      {
        path: '/om/visitManage',
        name: '回访管理',
        // icon: <Icon icon={'csOrganize'} />,
        // icon: placeIcon,
        component: '../pages/om/visitManage',
      },
    ],
  },

  {
    path: '/system',
    name: '系统管理',
    icon: <Icon icon={'systemManage'} />,
    component: '../Waiter',
    routes: [
      {
        path: '/sm/userManage',
        name: '用户管理',
        // icon: <ScheduleFilled />,
        // icon: <Icon icon={'userManage'} />,
        // icon: placeIcon,
        component: '../pages/sm/UserManage',
      },
      {
        path: '/sm/organize',
        name: '组织管理',
        // icon: <ScheduleFilled />,
        // icon: <Icon icon={'organize'} />,
        // icon: placeIcon,
        component: '../pages/sm/Organize',
      },
      {
        path: '/sm/role',
        name: '角色管理',
        // icon: <ScheduleFilled />,
        // icon: <Icon icon={'role'} />,
        // icon: placeIcon,
        component: '../pages/sm/Role',
      },
      {
        path: '/sm/dict',
        name: '字典管理',
        // icon: <ScheduleFilled />,
        // icon: <Icon icon={'dict'} />,
        // icon: placeIcon,
        component: '../pages/sm/Dict',
      },
      {
        path: '/sm/msg',
        name: '消息管理',
        // icon: <ScheduleFilled />,
        // icon: <Icon icon={'msg'} />,
        // icon: placeIcon,
        component: '../pages/sm/Msg',
      },
      {
        path: '/sm/csMonitor',
        name: '系统监控',
        // icon: <ScheduleFilled />,
        // icon: <Icon icon={'csMonitor'} />,
        // icon: placeIcon,
        component: '../pages/sm/CsMonitor',
      },
      {
        path: '/sm/operateRecord',
        name: '操作记录',
        // icon: <ScheduleFilled />,
        // icon: <Icon icon={'operateRecord'} />,
        // icon: placeIcon,
        component: '../pages/sm/OperateRecord',
      },
    ],
  },

  {
    path: '/knowledge',
    name: '新闻与知识点',
    icon: <Icon icon={'customerManage'} />,
    component: '../Waiter',
    routes: [
      {
        path: '/om/newsKnow',
        name: '新闻与知识点',
        // icon: placeIcon,
        component: '../Online',
      },
      {
        path: '/om/knowledgeCate',
        name: '知识库分类',
        // icon: placeIcon,
        component: '../pages',
      },
    ],
  },
]; //

export const customerRoutes = [
  {
    path: '/cs/csHome',
    name: '首页',
    icon: <ScheduleFilled />,
    icon: <Icon icon={'csHome'} />,
    component: '../Home',
  },
  {
    path: '/cs/msgList',
    name: '消息列表',
    icon: <ScheduleFilled />,
    icon: <Icon icon={'msgList'} />,
    component: '../pages/cs/PowerStation',
    routes: [
      {
        path: '/cs/alarmNotify',
        name: '告警通知',
        // icon: placeIcon,
        component: '../pages/cs/PowerStation',
      },
      {
        path: '/cs/systemNotify',
        name: '系统通知',
        // icon: placeIcon,
        component: '../pages/cs/ClientReport',
      },
    ],
  },
  {
    path: '/cs/csClientReport',
    name: '客户报告',
    icon: <Icon icon={'csClientReport'} />,
    component: '../pages/cs/CsClientReport',
  },
  {
    path: '/cs/inspectRecord',
    name: '巡检记录',
    // icon: <ScheduleFilled />,
    icon: <Icon icon={'csInspectRecord'} />,
    component: '../pages/om/InspectRecord',
  },
  {
    path: '/cs/bussniessRecord',
    name: '业务记录',
    // icon: <ScheduleFilled />,
    icon: <Icon icon={'bussniessRecord'} />,
    component: '../pages/om/InspectRecord',
  },
  {
    path: '/cs/userCenter',
    name: '个人中心',
    icon: <ScheduleFilled />,
    icon: <Icon icon={'csUserCenter'} />,
    component: '../pages/csUserCenter',
  },
  {
    path: '/cs/csOrganize',
    name: '组织管理',
    icon: <ScheduleFilled />,
    icon: <Icon icon={'csOrganize'} />,
    component: '../pages/cs/csOrganize',
  },
]; //

export default {
  route: {
    path: '/',
    routes: [],
  },
  location: {
    pathname: '/',
  },
};
