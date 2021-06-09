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
import { tips } from '@/utils';

const WorkOrderTable = props => {
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
      // d_item: 'id',
      className: 'textCenter',
    },
    {
      title: '编码',
      dataIndex: 'name',
      // d_item: 'id',
      detailFn: record =>
        props.showItemAsync({
          action: 'workOrderDetailAsync',
          d_id: record.id,
          extraReq: {
            url: 'getConsume',
            params: {
              order_id: record.id,
            },
          },
        }),
    },
    // {
    //   title: '工单编号',
    //   // dataIndex: '',
    // },
    {
      title: '客户名称',
      dataIndex: ['task', 'customer', 'name'],
      detailFn: record =>
        props.showItemAsync({
          action: 'clientDetailAsync',
          d_id: record.task.customer.id,
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
      dataMap: workOrderStatusMap,
    },
    {
      title: '处理人',
      dataIndex: ['team', 'team_headman'],
    },
    {
      title: '关联任务',
      dataIndex: ['task', 'name'],
      detailFn: record =>
        props.showItemAsync({
          action: 'missionsManageDetailAsync',
          d_id: record.task.id,
        }),
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
    {
      title: '描述',
      dataIndex: ['task', 'describe'],
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
        onClick={
          () =>
            props.exportDataAsync({
              action: 'exportData',
              order_ids: [record.id],
            })
          // tips('暂无接口！', 2)
        }
      >
        导出
      </a>
      {/* <a onClick={() => props.edit({ action: 'addTicket', d_id: record.id })}> */}
      {/* <a onClick={() => tips('还未开发完成！', 2)}>
        添加工作票
      </a> */}
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

export default WorkOrderTable;
