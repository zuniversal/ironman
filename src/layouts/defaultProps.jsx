import React from 'react';
import { TabletOutlined, ScheduleFilled } from '@ant-design/icons';
import Icon from '@/components/Widgets/Icons'; //



export default {
  route: {
    path: '/',
    routes: [
      // {
      //   path: '/dashBoard',
      //   name: '大屏展示',
      //   icon: <ScheduleFilled />,
      //   component: '../DashBoard',
      // },
      {
        path: '/om/home',
        name: '首页',
        icon: <ScheduleFilled />,
        // icon: <Icon icon={'home'} />,
        component: '../Home',
      },
      {
        path: '/cs/csHome',
        name: '首页',
        icon: <ScheduleFilled />,
        // icon: <Icon icon={'home'} />,
        component: '../Home',
      },
      {
        path: '/om/test',
        name: '开发测试',
        icon: <ScheduleFilled />,
        // icon: <Icon icon={'test'} />,
      },

      {
        path: '/cs/csOrganize',
        name: '组织管理',
        icon: <ScheduleFilled />,
        // icon: <Icon icon={'csOrganize'} />,
        component: '../pages/cs/csOrganize',
      },
      {
        path: '/cs/csUserCenter',
        name: '个人中心',
        icon: <ScheduleFilled />,
        // icon: <Icon icon={'csUserCenter'} />,
        component: '../pages/csUserCenter',
      },
      {
        path: '/om/shifts',
        name: '班组管理',
        icon: <ScheduleFilled />,
        // icon: <Icon icon={'shifts'} />,
        component: '../Shifts',
        routes: [
          {
            path: '/om/shiftsManage',
            name: '班组管理',
            // icon: <ScheduleFilled />,
            component: '../pages/om/ShiftsManage',
          },
          {
            // path: '/om/shiftsArrange',
            path: '/om/shiftsArrangeDetail',
            name: '排班',
            // icon: <ScheduleFilled />,
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
            component: '../pages/om/ShiftsTransfer',
          },
        ],
      },

      {
        path: '/om/contract',
        name: '合同管理',
        icon: <ScheduleFilled />,
        // icon: <Icon icon={'contract'} />,
        component: '../pages/om/Contract',
      },
      {
        path: '/om/client',
        name: '客户管理',
        icon: <ScheduleFilled />,
        // icon: <Icon icon={'client'} />,
        component: '../pages/om/Client',
      },
      {
        path: '/om/houseNo',
        name: '户号管理',
        icon: <ScheduleFilled />,
        // icon: <Icon icon={'houseNo'} />,
        component: '../pages/om/HouseNo',
      },
      {
        path: '/om/ps',
        name: '电站管理',
        icon: <ScheduleFilled />,
        // icon: <Icon icon={'ps'} />,
        component: '../pages/om/PowerStation',
        routes: [
          {
            path: '/om/powerStation',
            name: '电站管理',
            component: '../pages/om/PowerStation',
          },
          {
            path: '/om/clientReport',
            name: '客户报告',
            component: '../pages/om/ClientReport',
          },
        ],
      },
      {
        path: '/om/assets',
        name: '资产管理',
        icon: <ScheduleFilled />,
        // icon: <Icon icon={'assets'} />,
        component: '../pages/om/Assets',
      },

      {
        path: '/om/monitorManage',
        name: '监测管理',
        icon: <ScheduleFilled />,
        // icon: <Icon icon={'monitorManage'} />,
        component: '../pages/om/MonitorManage',
      },
      {
        path: '/om/goods',
        name: '物料管理',
        icon: <ScheduleFilled />,
        // icon: <Icon icon={'goods'} />,
        component: '../pages/om/Goods',
      },
      {
        path: '/om/missionsManage',
        name: '任务管理',
        icon: <ScheduleFilled />,
        // icon: <Icon icon={'missionsManage'} />,
        component: '../pages/om/MissionsManage',
      },
      {
        path: '/om/workOrder',
        name: '工单管理',
        icon: <ScheduleFilled />,
        // icon: <Icon icon={'workOrder'} />,
        component: '../pages/om/Workorder',
      },
      {
        path: '/om/operation',
        name: '巡检运维',
        icon: <ScheduleFilled />,
        // icon: <Icon icon={'operation'} />,
        component: '../pages/om/Operation',
        routes: [
          {
            path: '/om/inspectPlan',
            name: '巡检计划',
            // icon: <ScheduleFilled />,
            component: '../pages/om/InspectPlan',
          },
          {
            path: '/om/inspectMission',
            name: '巡检任务',
            // icon: <ScheduleFilled />,
            component: '../pages/om/InspectMission',
          },
          {
            path: '/om/inspectRecord',
            name: '巡检记录',
            // icon: <ScheduleFilled />,
            component: '../pages/om/InspectRecord',
          },
          {
            path: '/om/weak',
            name: '缺陷管理',
            // icon: <ScheduleFilled />,
            component: '../pages/om/Weak',
          },
        ],
      },
      {
        path: '/om/alarm',
        name: '告警管理',
        icon: <ScheduleFilled />,
        // icon: <Icon icon={'alarm'} />,
        component: '../Alarm',
        routes: [
          {
            path: '/om/alarmTemplate',
            name: '告警模板',
            // icon: <ScheduleFilled />,
            component: '../pages/om/AlarmTemplate',
          },
          {
            path: '/om/alarmRecord',
            name: '告警记录',
            // icon: <ScheduleFilled />,
            component: '../pages/om/AlarmRecord',
          },
        ],
      },
      {
        path: '/sm/userManage',
        name: '用户管理',
        icon: <ScheduleFilled />,
        // icon: <Icon icon={'userManage'} />,
        component: '../pages/sm/UserManage',
      },
      {
        path: '/sm/role',
        name: '角色管理',
        icon: <ScheduleFilled />,
        // icon: <Icon icon={'role'} />,
        component: '../pages/sm/Role',
      },
      {
        path: '/sm/organize',
        name: '组织管理',
        icon: <ScheduleFilled />,
        // icon: <Icon icon={'organize'} />,
        component: '../pages/sm/Organize',
      },
      {
        path: '/sm/msg',
        name: '消息管理',
        icon: <ScheduleFilled />,
        // icon: <Icon icon={'msg'} />,
        component: '../pages/sm/Msg',
      },
      {
        path: '/sm/dict',
        name: '字典管理',
        icon: <ScheduleFilled />,
        // icon: <Icon icon={'dict'} />,
        component: '../pages/sm/Dict',
      },
      {
        path: '/sm/csMonitor',
        name: '系统监控',
        icon: <ScheduleFilled />,
        // icon: <Icon icon={'csMonitor'} />,
        component: '../pages/sm/CsMonitor',
      },
      {
        path: '/sm/operateRecord',
        name: '操作记录',
        icon: <ScheduleFilled />,
        // icon: <Icon icon={'operateRecord'} />,
        component: '../pages/sm/OperateRecord',
      },

      {
        path: '/kpi',
        name: '绩效管理',
        icon: <ScheduleFilled />,
        // icon: <Icon icon={'kpi'} />,
        component: '../Kpi',
        routes: [
          {
            path: '/admin/appraise',
            name: '考核评价',
            // icon: <ScheduleFilled />,
            component: '../Appraise',
          },
          {
            path: '/admin/examine',
            name: '考核配置',
            // icon: <ScheduleFilled />,
            component: '../Examine',
          },
        ],
      },

      // {
      //   path: '/waiter',
      //   name: '客服管理',
      //   icon: <ScheduleFilled />,
      //   component: '../Waiter',
      //   routes: [
      //     {
      //       path: '/cs/online',
      //       name: '在线客服',
      //       // icon: <ScheduleFilled />,
      //       component: '../Online',
      //     },
      //     {
      //       path: '/cs/feedback',
      //       name: '回访管理',
      //       // icon: <ScheduleFilled />,
      //       component: '../Feedback',
      //     },
      //   ],
      // },
    ],
  },
  location: {
    pathname: '/',
  },
};
