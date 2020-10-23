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
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Radio,
  Space,
  InputNumber,
} from 'antd';

import SmartTable from '@/common/SmartTable'; //

const WorkOrderTable = props => {
  console.log(' WorkOrderTable  ： ', props); //
  const {
    showModal,
    edit,
    remove,
    tdClick,
    dispatchOrder,
    exportData,
    showDetail,
    addTicket,
    add,
  } = props; //

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      d_item: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
      d_item: 'id',
    },
    {
      title: '工单编号',
      // dataIndex: '',
    },
    {
      title: '客户名称',
      dataIndex: 'name',
    },
    {
      title: '工单类型',
      dataIndex: 'type',
    },
    {
      title: '当前状态',
      dataIndex: 'status',
    },
    {
      title: '处理人',
      dataIndex: ['recipient', 'name'],
    },
    {
      title: '关联任务',
      dataIndex: ['task', 'name'],
    },
    {
      title: '任务状态',
      dataIndex: ['task', 'status'],
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
    },
  ];

  const extra = props => (
    <>
      {/* <a onClick={() => showDetail({ action: 'detail' })}>xx详情</a> */}
      <a onClick={() => dispatchOrder({ action: 'dispatchOrder' })}>派单</a>
      <a onClick={() => exportData({ action: 'exportData' })}>导出</a>
      <a onClick={() => addTicket({ action: 'addTicket' })}>添加工作票</a>
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

WorkOrderTable.defaultProps = {
  tdClick: () => {},
};

export default WorkOrderTable;
