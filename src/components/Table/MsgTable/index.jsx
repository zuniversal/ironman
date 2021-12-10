import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import SmartTable from '@/common/SmartTable';

const MsgTable = props => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },

    {
      title: '消息',
      dataIndex: 'content',
    },

    {
      title: '通知人员',
      // dataIndex: ['reciever', 'nickname'],
      dataIndex: 'reciever',
    },

    {
      title: '通知方法',
      dataIndex: 'send_type',
    },

    {
      title: '创建人',
      dataIndex: ['sender', 'username'],
    },

    {
      title: '创建时间',
      dataIndex: 'created_time',
    },
  ];

  return (
    <SmartTable columns={columns} {...props} noActionCol noDefault></SmartTable>
  );
};

export default MsgTable;
