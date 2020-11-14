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

import SmartTable from '@/common/SmartTable'; //

const ShiftsArrangeTable = props => {
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '交班人',
      dataIndex: 'transfer_team',
    },
    {
      title: '接班人',
      dataIndex: 'recieve_team',
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
    },
  ];

  return <SmartTable columns={columns} {...props}></SmartTable>;
};

ShiftsArrangeTable.defaultProps = {
  // showModal: () => {},
  tdClick: () => {},
  // remove: () => {},
};

export default ShiftsArrangeTable;
