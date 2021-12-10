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

const WeakTable = props => {
  const columns = [
    {
      title: '内容摘要',
      // dataIndex: '',
    },
    {
      title: 'ID',
      // dataIndex: '',
    },
    {
      title: '处理状态',
      // dataIndex: '',
    },
    {
      title: '消费时间',
      // dataIndex: '',
    },
    {
      title: '是否需要处理',
      // dataIndex: '',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() =>
          props.showFormModal({
            action: 'detail',
            d_id: record.id,
          })
        }
      >
        查看详情
      </a>
      <a onClick={() => props.showFormModal({ action: 'more' })}>更多</a>
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

export default WeakTable;
