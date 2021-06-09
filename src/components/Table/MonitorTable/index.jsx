import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './style.less';

import SmartTable from '@/common/SmartTable';

const MonitorTable = props => {
  const columns = [
    {
      title: '所属客户',
    },
    {
      title: '户号',
    },
    {
      title: '电站',
    },
    {
      title: '设备名称',
    },
    {
      title: '关联设备',
    },
    {
      title: '监控点',
    },
    {
      title: '设备类型',
    },
    {
      title: 'IMEI号',
    },
    {
      title: '状态',
    },
  ];

  return <SmartTable columns={columns} {...props}></SmartTable>;
};

export default MonitorTable;
