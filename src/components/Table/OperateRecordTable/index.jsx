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

const MsgTable = props => {
  const columns = [
    {
      title: 'id',
    },
    {
      title: '模块',
    },
    {
      title: '操作',
    },
    {
      title: '操作人',
    },
    {
      title: '操作内容',
    },
    {
      title: '操作时间',
    },
  ];

  return <SmartTable noDefault columns={columns} {...props}></SmartTable>;
};

export default MsgTable;
