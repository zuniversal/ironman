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
  const { showModal, edit, remove, tdClick, showDetail, inspectReport } = props; //

  const columns = [
    {
      title: '内容',
      dataIndex: 'status',
    },
    {
      title: '电站',
      dataIndex: '',
    },

    {
      title: '当前类型',
      dataIndex: 'status',
    },
    {
      title: '巡检日期',
      dataIndex: 'work_date',
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
