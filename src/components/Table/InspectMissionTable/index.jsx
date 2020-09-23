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

const InspectMissionTable = props => {
  console.log(' InspectMissionTable  ： ', props); //
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
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
      title: '当前状态',
      dataIndex: 'status',
    },

    {
      title: '领取人',
      dataIndex: '',
    },

    {
      title: '执行时间',
      dataIndex: 'work_date',
    },
    {
      title: '领取时间',
      dataIndex: 'assign_date',
    },
  ];

  const extra = props => (
    <>
      <a onClick={() => tdClick({ action: 'showList' })}>派发</a>
      <a onClick={() => tdClick({ action: 'showList' })}>已领取</a>
      <a onClick={() => tdClick({ action: 'showList' })}>已开始</a>
      <a onClick={() => tdClick({ action: 'showList' })}>已完成</a>
      <a onClick={() => tdClick({ action: 'showList' })}>修改日期</a>
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

InspectMissionTable.defaultProps = {
  tdClick: () => {},
};

export default InspectMissionTable;
