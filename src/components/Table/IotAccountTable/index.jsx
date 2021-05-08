import React from 'react';
import './style.less';

import SmartTable from '@/common/SmartTable';
import { simcardStatusMap, validityPeriodMap } from '@/configs';

const IotAccountTable = props => {
  const columns = [
    {
      title: 'ICCID',
      dataIndex: 'iccid',
    },
    {
      title: 'SIM卡号',
      dataIndex: 'sim_number',
    },
    {
      title: '开户时间',
      dataIndex: 'start_time',
      day: 'YYYY-MM-DD HH:mm:ss',
    },
    {
      title: '套餐流量',
      dataIndex: 'flow',
    },
    {
      title: '套餐有效期',
      dataIndex: 'validity_period',
      dataMap: validityPeriodMap,
    },
    {
      title: '运营商',
      dataIndex: 'operator',
    },
    {
      title: '供应商',
      dataIndex: 'supplier',
    },
    {
      title: '状态',
      dataIndex: 'status',
      dataMap: simcardStatusMap,
    },
    {
      title: '激活时间',
      dataIndex: 'activate_time',
      day: 'YYYY-MM-DD HH:mm:ss',
    },
    {
      title: '到期时间',
      dataIndex: 'end_time',
      day: 'YYYY-MM-DD HH:mm:ss',
    },
  ];

  return <SmartTable columns={columns} {...props}></SmartTable>;
};

IotAccountTable.defaultProps = {};

export default IotAccountTable;
