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

const BussniessRecordTable = props => {
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: '订单ID',
      dataIndex: 'id',
    },
    {
      title: '类型',
      dataIndex: 'content',
    },
    {
      title: '处理状态',
      dataIndex: '',
    },
    {
      title: '申请时间',
      dataIndex: '',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a onClick={() => props.showFormModal({ action: 'detail' })}>查看详情</a>
      <a onClick={() => props.showFormModal({ action: 'powerDetail' })}>
        xx详情
      </a>
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

BussniessRecordTable.defaultProps = {
  tdClick: () => {},
};

export default BussniessRecordTable;
