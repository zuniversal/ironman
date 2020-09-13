import React from 'react';
import {
  TabletOutlined,
  ScheduleFilled,


} from '@ant-design/icons';

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
        path: '/',
        name: '首页',
        icon: <ScheduleFilled />,
        component: '../Home',
      },
      {
        path: '/om/userCenter',
        name: '用户中心',
        icon: <ScheduleFilled />,
        component: '../pages/UserCenter',
      },
      {
        path: '/om/shifts',
        name: '班组管理',
        icon: <ScheduleFilled />,
        component: '../Shifts',
        routes: [
          {
            path: '/om/shifts',
            name: '班组管理',
            // icon: <ScheduleFilled />,
            component: '../pages/om/Shifts',
          },
          {
            path: '/om/shifts/arrange',
            name: '排班',
            // icon: <ScheduleFilled />,
            component: '../pages/om/Arrange',
          },
          {
            path: '/om/shifts/transfer',
            name: '交接班',
            // icon: <ScheduleFilled />,
            component: '../pages/om/Transfer',
          },
        ],
      },

      




      {
        path: '/om/contract',
        name: '合同管理',
        icon: <ScheduleFilled />,
        component: '../pages/om/Contract',
      },
      {
        path: '/om/client',
        name: '客户管理',
        icon: <ScheduleFilled />,
        component: '../pages/om/Client',
      },
      {
        path: '/om/houseno',
        name: '户号管理',
        icon: <ScheduleFilled />,
        component: '../pages/om/HouseNo',
      },
      {
        path: '/om/assets',
        name: '资产管理',
        icon: <ScheduleFilled />,
        component: '../pages/om/Assets',
      },
      {
        path: '/om/powerstation',
        name: '电站管理',
        icon: <ScheduleFilled />,
        component: '../pages/om/PowerStation',
      },
      {
        path: '/om/clentReport',
        name: '客户报告',
        icon: <ScheduleFilled />,
        component: '../pages/om/ClentReport',
      },



      



      { 
        path: '/sm/userManage',
        name: '用户管理',
        icon: <ScheduleFilled />,
        component: '../pages/sm/UserManage',
      },
      {
        path: '/sm/organize',
        name: '组织管理',
        icon: <ScheduleFilled />,
        component: '../pages/sm/Organize',
      },
      {
        path: '/sm/role',
        name: '角色管理',
        icon: <ScheduleFilled />,
        component: '../pages/sm/Role',
      },
      {
        path: '/sm/dict',
        name: '字典管理',
        icon: <ScheduleFilled />,
        component: '../pages/sm/Dict',
      },
      {
        path: '/sm/msg',
        name: '消息管理',
        icon: <ScheduleFilled />,
        component: '../pages/sm/Msg',
      },
      {
        path: '/sm/csMonitor',
        name: '系统监控',
        icon: <ScheduleFilled />,
        component: '../pages/sm/CsMonitor',
      },
      {
        path: '/sm/operate',
        name: '操作记录',
        icon: <ScheduleFilled />,
        component: '../pages/sm/Operate',
      },




      




      
      {
        path: '/om/monitor',
        name: '监测管理',
        icon: <ScheduleFilled />,
        component: '../pages/om/Monitor',
      },
      {
        path: '/om/goods',
        name: '物料管理',
        icon: <ScheduleFilled />,
        component: '../pages/om/Goods',
      },
      {
        path: '/om/missions',
        name: '任务管理',
        icon: <ScheduleFilled />,
        component: '../pages/om/Missions',
      },
      {
        path: '/om/workOrder',
        name: '工单管理',
        icon: <ScheduleFilled />,
        component: '../pages/om/Workorder',
      },
      {
        path: '/om/operation',
        name: '巡检运维',
        icon: <ScheduleFilled />,
        component: '../pages/om/Operation',
        routes: [
          {
            path: '/admin/inspectplan',
            name: '巡检计划',
            // icon: <ScheduleFilled />,
            component: '../pages/om/InspectPlan',
          },
          {
            path: '/admin/inspectMission',
            name: '巡检任务',
            // icon: <ScheduleFilled />,
            component: '../pages/om/InspectMission',
          },
          {
            path: '/admin/inspectrecord',
            name: '巡检记录',
            // icon: <ScheduleFilled />,
            component: '../pages/om/InspectRecord',
          },
          {
            path: '/admin/weak',
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
        component: '../Alarm',
        routes: [
          {
            path: '/admin/template',
            name: '告警模板',
            // icon: <ScheduleFilled />,
            component: '../pages/om/Template',
          },
          {
            path: '/admin/alarmrecord',
            name: '告警记录',
            // icon: <ScheduleFilled />,
            component: '../pages/om/AlarmRecord',
          },
        ],
      },


      {
        path: '/kpi',
        name: '绩效管理',
        icon: <ScheduleFilled />,
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
      //       path: '/admin/online',
      //       name: '在线客服',
      //       // icon: <ScheduleFilled />,
      //       component: '../Online',
      //     },
      //     {
      //       path: '/admin/feedback',
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
