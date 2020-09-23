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
  const { showModal, edit, remove, tdClick } = props; //

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
      title: '处理人务',
    },
    {
      title: '关联任',
    },
    {
      title: '任务状态',
    },
    {
      title: '客户确认',
    },
    {
      title: '创建时间',
    },
  ];

  const extra = props => (
    <>
      <a onClick={() => tdClick({ action: 'showList' })}>派单</a>
      <a onClick={() => tdClick({ action: 'showList' })}>导出</a>
      <a onClick={() => tdClick({ action: 'showList' })}>添加工作票</a>
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
