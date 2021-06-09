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

const ArrangeTable = props => {
  const columns = [
    {
      title: 'id',
    },
    {
      title: '模块',
    },
    {
      title: '名称',
    },
    {
      title: '枚举值',
    },
    {
      title: '关联设备',
    },
    {
      title: '备注',
    },
  ];

  return <SmartTable columns={columns} {...props}></SmartTable>;
};

export default ArrangeTable;
