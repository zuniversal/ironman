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

const WeakTable = props => {
  const columns = [
    {
      title: '反馈人',
      dataIndex: ['team', 'name'],
    },

    {
      title: '反馈时间',
      dataIndex: 'created_time',
    },

    // {
    //   title: '处理状态',
    //   dataIndex: 'status',
    //   dataMap: missionsStatusMap,
    // },

    {
      title: '备注',
      dataIndex: 'remark',
    },
  ];

  return <SmartTable columns={columns} {...props}></SmartTable>;
};

WeakTable.defaultProps = {};

export default WeakTable;
