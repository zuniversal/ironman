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

const AppraiseTable = props => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '姓名',
      // dataIndex: '',
    },
    {
      title: '部门',
      // dataIndex: '',
    },
    {
      title: '月份',
      // dataIndex: '',
    },
    {
      title: '自评',
      // dataIndex: '',
    },
    {
      title: 'N+1',
      // dataIndex: '',
    },
    {
      title: 'N+2',
      // dataIndex: '',
    },
    {
      title: '',
      // dataIndex: '',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a onClick={() => props.edit({ action: 'grade', d_id: record.id })}>
        自评
      </a>
      <a onClick={() => props.tdClick({ action: 'detail', d_id: record.id })}>
        N+1
      </a>
      <a onClick={() => props.tdClick({ action: 'detail', d_id: record.id })}>
        N+2
      </a>
    </>
  );

  return (
    <SmartTable
      columns={columns}
      extra={extra}
      noDefault
      {...props}
    ></SmartTable>
  );
};

export default AppraiseTable;
