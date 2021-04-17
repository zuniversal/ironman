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

const OrderConsumeTable = props => {
  const columns = [
    {
      title: '材料',
      dataIndex: ['material', 'name'],
    },
    {
      title: '数量',
      dataIndex: 'number',
    },
  ];

  return <SmartTable columns={columns} {...props}></SmartTable>;
};

OrderConsumeTable.defaultProps = {};

export default OrderConsumeTable;
