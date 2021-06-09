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
import {
  workOrderStatusMap,
  missionsTypeMap,
  missionsStatusMap,
} from '@/configs';

const TicketCeopleChangeTable = props => {
  const {
    showModal,
    edit,
    remove,
    dispatchOrder,
    exportData,
    showDetail,
    addTicket,
    add,
  } = props;

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      d_item: 'id',
      className: 'textCenter',
    },
    {
      title: '名称',
      dataIndex: 'name',
      d_item: 'id',
    },
    // {
    //   title: '工单编号',
    //   // dataIndex: '',
    // },
    {
      title: '客户名称',
      dataIndex: ['task', 'customer', 'name'],
    },
    {
      title: '工单类型',
      dataIndex: 'type',
      dataMap: missionsTypeMap,
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      dataMap: workOrderStatusMap,
    },
    {
      title: '处理人',
      dataIndex: ['team', 'team_headman'],
    },
    {
      title: '关联任务',
      dataIndex: ['task', 'name'],
    },
    {
      title: '任务状态',
      dataIndex: ['task', 'status'],
      dataMap: missionsStatusMap,
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
    },
  ];

  // team返回有数据，派单按钮隐藏不显示
  const extra = (text, record, index, props) => (
    <>
      {/* <a onClick={() => showDetail({ action: 'detail' })}>xx详情</a> */}
      {!record.team.id && (
        <a
          onClick={() =>
            props.edit({ action: 'dispatchOrder', d_id: record.id })
          }
        >
          派单
        </a>
      )}
      <a
        onClick={() =>
          props.exportData({ action: 'exportData', d_id: record.id })
        }
      >
        导出
      </a>
      <a onClick={() => props.edit({ action: 'addTicket', d_id: record.id })}>
        添加工作票
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

TicketCeopleChangeTable.defaultProps = {};

export default TicketCeopleChangeTable;
