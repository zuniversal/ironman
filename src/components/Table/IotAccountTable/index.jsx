import React from 'react';
import './style.less';

import SmartTable from '@/common/SmartTable';
import { monitorDeviceStatusMap, networkTypeMap } from '@/configs';

const IotAccountTable = props => {
  const columns = [
    {
      title: 'ICCID',
      dataIndex: '',
    },
    {
      title: 'SIM卡号',
      dataIndex: '',
    },
    {
      title: '开户时间',
      dataIndex: '',
    },
    {
      title: '套餐流量',
      dataIndex: '',
    },
    {
      title: '套餐有效期',
      dataIndex: '',
    },
    {
      title: '运营商',
      dataIndex: '',
    },
    {
      title: '供应商',
      dataIndex: '',
    },
    {
      title: '状态',
      dataIndex: '',
      dataMap: networkTypeMap,
    },
    {
      title: '激活时间',
      dataIndex: '',
      dataMap: monitorDeviceStatusMap,
    },
    {
      title: '到期时间',
      dataIndex: '',
      dataMap: monitorDeviceStatusMap,
    },
  ];

  return <SmartTable columns={columns} {...props}></SmartTable>;
};

IotAccountTable.defaultProps = {};

export default IotAccountTable;
