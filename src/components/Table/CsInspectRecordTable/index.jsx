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

const InspectRecordTable = props => {
  console.log(' InspectRecordTable  ： ', props); //
  const { showModal, edit, remove, tdClick, showDetail, inspectReport } = props; //

  const columns = [
    {
      title: '消息摘要',
      dataIndex: 'status',
      d_item: 'id',
    },

    {
      title: '类型',
      dataIndex: 'status',
    },
    {
      title: '处理状态',
      dataIndex: 'status',
    },
    {
      title: '消息时间',
      dataIndex: 'work_date',
    },
    {
      title: '是否需要处理',
      dataIndex: 'assign_date',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a onClick={() => props.showFormModal({ action: 'detail' })}>查看详情</a>
      <a onClick={() => props.showFormModal({ action: 'showMore' })}>更多</a>
    </>
  );

  return (
    <SmartTable
      columns={columns}
      // dataSource={noCalculateList}
      // rowKey={'source_no'}
      extra={extra}
      noDefault
      {...props}
    ></SmartTable>
  );
};

InspectRecordTable.defaultProps = {
  tdClick: () => {},
};

export default InspectRecordTable;
