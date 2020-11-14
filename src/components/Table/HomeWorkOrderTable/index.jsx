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

const HomeWorkOrderTable = props => {
  const {
    showModal,
    edit,
    remove,
    tdClick,
    dispatchOrder,
    exportData,
    addTicket,
    add,
  } = props; //

  const columns = [
    {
      title: 'id',
    },
    {
      title: '名称',
    },
    {
      title: '工单编号',
    },
    {
      title: '客户名称',
    },
    {
      title: '工单类型',
    },
    {
      title: '当前状态',
    },
    {
      title: '领取人',
    },
    {
      title: '创建时间',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a onClick={() => dispatchOrder({ action: 'dispatchOrder' })}>派单</a>
      <a onClick={() => add({ action: 'add' })}>添加工作票</a>
      {/* <a onClick={() => addTicket({ action: 'addTicket' })}>添加工作票</a> */}
    </>
  );

  return (
    <SmartTable
      columns={columns}
      rowLength={3}
      pagination={false}
      extra={extra}
      noDefault
      {...props}
    ></SmartTable>
  );
};

HomeWorkOrderTable.defaultProps = {
  tdClick: () => {},
};

export default HomeWorkOrderTable;
