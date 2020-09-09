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

export const DeviceInfoTable = props => {
  console.log(' DeviceInfoTable  ： ', props); //
  const { showModal, edit, remove, tdClick,    } = props; //

  const columns = [
    {
      title: '设备编号 ',
    },
    {
      title: '设备名称',
    },
    {
      title: '电压容量',
    },
    {
      title: '实际使用用里',
    },
    {
      title: '备注',
    },
  ];

  return (
    <SmartTable
      noActionCol
      columns={columns}
      // dataSource={noCalculateList}
      // rowKey={'source_no'}
      
      rowLength={1}
      {...props}
    ></SmartTable>
  );
};


export const WatchInfoTable = props => {
  console.log(' WatchInfoTable  ： ', props); //
  const { showModal, edit, remove, tdClick,    } = props; //

  const columns = [
    {
      title: '监控点编号',
    },
    {
      title: '监控点名称',
    },
    {
      title: '统计数量',
      render: (text, record, index) => <a onClick={() => tdClick({action: 'detail'})}>{text}</a>,
    },
    {
      title: '备注',
    },
  ];

  return (
    <SmartTable
      noActionCol
      columns={columns}
      // dataSource={noCalculateList}
      // rowKey={'source_no'}
      
      rowLength={1}
      {...props}
    ></SmartTable>
  );
};

