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

const SmMonitorTable = props => {
  const columns = [
    {
      title: 'id',
    },
    {
      title: '服务',
    },
    {
      title: '状态',
    },
  ];

  return <SmartTable columns={columns} {...props}></SmartTable>;
};

export default SmMonitorTable;
