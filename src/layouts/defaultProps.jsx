import React from 'react';
import {
  SmileOutlined,
  CrownOutlined,
  TabletOutlined,
} from '@ant-design/icons';

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/大屏展示',
        name: '大屏展示',
        // icon: <SmileOutlined />,
        component: '../ProTable',
      },
      {
        path: '/首页',
        name: '首页',
        // icon: <SmileOutlined />,
        component: '../Welcome',
      },
      {
        path: '/班组管理',
        name: '班组管理',
        // icon: <SmileOutlined />,
        component: '../Welcome',
        routes: [
          {
            path: '/admin/班组管理',
            name: '班组管理',
            icon: <CrownOutlined />,
            component: '../Welcome',
          },
          {
            path: '/admin/排班',
            name: '排班',
            icon: <CrownOutlined />,
            component: '../Welcome',
          },
          {
            path: '/admin/交接班',
            name: '交接班',
            icon: <CrownOutlined />,
            component: '../Welcome',
          },
        ],
      },
      {
        path: '/contract',
        name: '合同管理',
        // icon: <SmileOutlined />,
        component: '../pages/om/Contract',
      },
      {
        path: '/client',
        name: '客户管理',
        // icon: <SmileOutlined />,
        component: '../pages/om/Client',
      },
      {
        path: '/houseno',
        name: '户号管理',
        // icon: <SmileOutlined />,
        component: '../pages/om/HouseNo',
      },
      {
        path: '/资产管理',
        name: '资产管理',
        // icon: <SmileOutlined />,
        component: '../Welcome',
      },
      {
        path: '/powerstation',
        name: '电站管理',
        // icon: <SmileOutlined />,
        component: '../pages/om/PowerStation',
      },
      {
        path: '/客户报告',
        name: '客户报告',
        // icon: <SmileOutlined />,
        component: '../Welcome',
      },
      {
        path: '/监测管理',
        name: '监测管理',
        // icon: <SmileOutlined />,
        component: '../Welcome',
      },
      {
        path: '/物料管理',
        name: '物料管理',
        // icon: <SmileOutlined />,
        component: '../Welcome',
      },
      {
        path: '/任务管理',
        name: '任务管理',
        // icon: <SmileOutlined />,
        component: '../Welcome',
      },
      {
        path: '/工单管理',
        name: '工单管理',
        // icon: <SmileOutlined />,
        component: '../Welcome',
      },
      {
        path: '/巡检运维',
        name: '巡检运维',
        // icon: <SmileOutlined />,
        component: '../Welcome',
        routes: [
          {
            path: '/admin/巡检计划',
            name: '巡检计划',
            icon: <CrownOutlined />,
            component: '../Welcome',
          },
          {
            path: '/admin/巡检任务',
            name: '巡检任务',
            icon: <CrownOutlined />,
            component: '../Welcome',
          },
          {
            path: '/admin/巡检记录',
            name: '巡检记录',
            icon: <CrownOutlined />,
            component: '../Welcome',
          },
          {
            path: '/admin/缺陷管理',
            name: '缺陷管理',
            icon: <CrownOutlined />,
            component: '../Welcome',
          },
        ],
      },
      {
        path: '/告警管理',
        name: '告警管理',
        // icon: <SmileOutlined />,
        component: '../Welcome',
        routes: [
          {
            path: '/admin/告警模板',
            name: '告警模板',
            icon: <CrownOutlined />,
            component: '../Welcome',
          },
          {
            path: '/admin/告警记录',
            name: '告警记录',
            icon: <CrownOutlined />,
            component: '../Welcome',
          },
        ],
      },
      {
        path: '/绩效管理',
        name: '绩效管理',
        // icon: <SmileOutlined />,
        component: '../Welcome',
        routes: [
          {
            path: '/admin/考核评价',
            name: '考核评价',
            icon: <CrownOutlined />,
            component: '../Welcome',
          },
          {
            path: '/admin/考核配置',
            name: '考核配置',
            icon: <CrownOutlined />,
            component: '../Welcome',
          },
        ],
      },
      {
        path: '/客服管理',
        name: '客服管理',
        // icon: <SmileOutlined />,
        component: '../Welcome',
        routes: [
          {
            path: '/admin/在线客服',
            name: '在线客服',
            icon: <CrownOutlined />,
            component: '../Welcome',
          },
          {
            path: '/admin/回访管理',
            name: '回访管理',
            icon: <CrownOutlined />,
            component: '../Welcome',
          },
        ],
      },
    ],
  },
  location: {
    pathname: '/',
  },
};
