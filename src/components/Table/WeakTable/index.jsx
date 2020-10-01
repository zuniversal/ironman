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

const WeakTable = props => {
  console.log(' WeakTable  ： ', props); //
  const { showModal, edit, remove, tdClick } = props; //

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
      title: '电站',
      // dataIndex: 'station.name',
      dataIndex: ['station', 'name'],
    },

    {
      title: '客户名称',
      // dataIndex: 'customer.name',
      dataIndex: ['customer', 'name'],
    },

    {
      title: '反馈人',
      // dataIndex: 'team.name',
      dataIndex: ['team', 'name'],
    },

    {
      title: '反馈时间',
      dataIndex: 'created_time',
    },

    {
      title: '处理状态',
      dataIndex: 'status',
    },

    {
      title: '备注',
      dataIndex: 'remark',
    },
  ];

  const extra = props => (
    <>
      <a onClick={() => tdClick({ action: 'showList' })}>处理</a>
      <a onClick={() => tdClick({ action: 'showList' })}>通知客户</a>
      <a onClick={() => tdClick({ action: 'showList' })}>导出</a>
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

WeakTable.defaultProps = {
  tdClick: () => {},
};

export default WeakTable;
