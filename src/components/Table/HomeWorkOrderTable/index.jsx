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
import { missionsTypeMap, missionsStatusMap } from '@/configs';

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
  } = props;

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    // {
    //   title: '名称',
    //   dataIndex: 'name',
    // },
    {
      title: '工单编号',
      dataIndex: 'name',
      detailFn: record =>
        props.showItemAsync({
          action: 'workOrderDetailAsync',
          d_id: record.id,
        }),
    },
    {
      noCutText: true,
      title: '客户名称',
      dataIndex: ['customer', 'name'],
      detailFn: record =>
        props.showItemAsync({
          action: 'clientDetailAsync',
          d_id: record.customer.id,
        }),
    },
    {
      title: '工单类型',
      dataIndex: 'type',
      dataMap: missionsTypeMap,
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      dataMap: missionsStatusMap,
    },
    {
      title: '领取人',
      dataIndex: ['team', 'team_headman'],
    },
    {
      title: '领取时间',
      dataIndex: 'created_time',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() =>
          props.showFormModal({ action: 'dispatchOrder', extraData: record })
        }
      >
        派单
      </a>
      {/* <a onClick={() => add({ action: 'add', extraData: record })}>
        添加工作票
      </a> */}
      {/* <a onClick={() => addTicket({ action: 'addTicket' })}>添加工作票</a> */}
    </>
  );

  return (
    <SmartTable
      columns={columns}
      // rowLength={3}
      // pagination={false}
      extra={extra}
      // noActionCol
      noDefault
      rowSelection={null}
      {...props}
    ></SmartTable>
  );
};

HomeWorkOrderTable.defaultProps = {
  tdClick: () => {},
};

export default HomeWorkOrderTable;
