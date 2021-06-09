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

const DictTable = props => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '模块',
      dataIndex: 'model',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '枚举值',
      dataIndex: 'value',
    },
    {
      title: '关联设备',
      dataIndex: ['equipment', 'name'],
    },
    {
      title: '备注',
      dataIndex: 'remarks',
    },
  ];

  return <SmartTable columns={columns} {...props}></SmartTable>;
};

export default DictTable;
