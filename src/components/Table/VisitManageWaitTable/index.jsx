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

const VisitManageWaitTable = props => {
  const columns = [
    {
      title: 'id',
      dataIndex: '',
    },
    {
      title: '电站',
      dataIndex: '',
    },
    {
      title: '客户名称',
      dataIndex: '',
    },
    {
      title: '客户电话',
      dataIndex: '',
    },
    {
      title: '类型',
      dataIndex: '',
    },
    {
      title: '客服',
      dataIndex: '',
    },
    {
      title: '开始时间',
      dataIndex: '',
    },
    {
      title: '关联任务id',
      dataIndex: '',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() =>
          props.showFormModal({
            action: 'complete',
            d_id: record.id,
          })
        }
      >
        处理回访
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

export default VisitManageWaitTable;
