import React from 'react';
import {
  TabletOutlined,
  ScheduleFilled,


} from '@ant-design/icons';

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/dashBoard',
        name: '大屏展示',
        icon: <ScheduleFilled />,
        component: '../DashBoard',
      },
      {
        path: '/',
        name: '首页',
        icon: <ScheduleFilled />,
        component: '../Home',
      },
      {
        path: '/userCenter',
        name: '用户中心',
        icon: <ScheduleFilled />,
        component: '../pages/UserCenter',
      },
      {
        path: '/shifts',
        name: '班组管理',
        icon: <ScheduleFilled />,
        component: '../Shifts',
        routes: [
          {
            path: '/admin/shifts',
            name: '班组管理',
            // icon: <ScheduleFilled />,
            component: '../Shifts',
          },
          {
            path: '/admin/arrange',
            name: '排班',
            // icon: <ScheduleFilled />,
            component: '../Arrange',
          },
          {
            path: '/admin/change',
            name: '交接班',
            // icon: <ScheduleFilled />,
            component: '../Change',
          },
        ],
      },
      {
        path: '/contract',
        name: '合同管理',
        icon: <ScheduleFilled />,
        component: '../pages/om/Contract',
      },
      {
        path: '/client',
        name: '客户管理',
        icon: <ScheduleFilled />,
        component: '../pages/om/Client',
      },
      {
        path: '/houseno',
        name: '户号管理',
        icon: <ScheduleFilled />,
        component: '../pages/om/HouseNo',
      },
      {
        path: '/assets',
        name: '资产管理',
        icon: <ScheduleFilled />,
        component: '..Assets/Welcome',
      },
      {
        path: '/powerstation',
        name: '电站管理',
        icon: <ScheduleFilled />,
        component: '../pages/om/PowerStation',
      },
      {
        path: '/clentReport',
        name: '客户报告',
        icon: <ScheduleFilled />,
        component: '../Clentreport',
      },
      {
        path: '/monitor',
        name: '监测管理',
        icon: <ScheduleFilled />,
        component: '../Monitor',
      },
      {
        path: '/goods',
        name: '物料管理',
        icon: <ScheduleFilled />,
        component: '../Goods',
      },
      {
        path: '/missions',
        name: '任务管理',
        icon: <ScheduleFilled />,
        component: '../Missions',
      },
      {
        path: '/workOrder',
        name: '工单管理',
        icon: <ScheduleFilled />,
        component: '../Workorder',
      },
      {
        path: '/operation',
        name: '巡检运维',
        icon: <ScheduleFilled />,
        component: '../Operation',
        routes: [
          {
            path: '/admin/Plan',
            name: '巡检计划',
            // icon: <ScheduleFilled />,
            component: '../Plan',
          },
          {
            path: '/admin/mission',
            name: '巡检任务',
            // icon: <ScheduleFilled />,
            component: '../Mission',
          },
          {
            path: '/admin/record',
            name: '巡检记录',
            // icon: <ScheduleFilled />,
            component: '../Record',
          },
          {
            path: '/admin/weak',
            name: '缺陷管理',
            // icon: <ScheduleFilled />,
            component: '../Weak',
          },
        ],
      },
      {
        path: '/alarm',
        name: '告警管理',
        icon: <ScheduleFilled />,
        component: '../Alarm',
        routes: [
          {
            path: '/admin/template',
            name: '告警模板',
            // icon: <ScheduleFilled />,
            component: '../Template',
          },
          {
            path: '/admin/record',
            name: '告警记录',
            // icon: <ScheduleFilled />,
            component: '../Record',
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
      {
        path: '/waiter',
        name: '客服管理',
        icon: <ScheduleFilled />,
        component: '../Waiter',
        routes: [
          {
            path: '/admin/online',
            name: '在线客服',
            // icon: <ScheduleFilled />,
            component: '../Online',
          },
          {
            path: '/admin/feedback',
            name: '回访管理',
            // icon: <ScheduleFilled />,
            component: '../Feedback',
          },
        ],
      },
    ],
  },
  location: {
    pathname: '/',
  },
};
