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

const AssetsTable = props => {
  console.log(' AssetsTable  ： ', props); //
  const { showModal, edit, remove, tdClick, showDetail } = props; //

  const columns = [
    // {
    //   title: '所属客户',
    //   dataIndex: 'customer_name',
    //   d_item: 'id',
    //   // render: (text, record, index) => (
    //   //   <a onClick={() => showDetail({ action: 'detail' })}>{text}</a>
    //   // ),
    // },
    {
      title: '户号',
      dataIndex: 'code',
      d_item: 'id',
      // render: (text, record, index) => (
      //   <a onClick={() => showDetail({ action: 'detail' })}>{text}</a>
      // ),
    },
    {
      title: '电站',
      dataIndex: 'station_name',
      d_item: 'id',
      // render: (text, record, index) => (
      //   <a onClick={() => showDetail({ action: 'detail' })}>{text}</a>
      // ),
    },
    {
      title: '设备名称',
      dataIndex: 'name',
      d_item: 'id',
      // render: (text, record, index) => (
      //   <a onClick={() => showDetail({ action: 'detail' })}>{text}</a>
      // ),
    },
    {
      title: '设备型号',
      dataIndex: 'model',
    },
    {
      title: '变压容量',
      dataIndex: 'transformer_capacity',
    },
    {
      title: '出厂日期',
      dataIndex: 'production_date',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
  ];

  const showQRCode = e => {
    console.log(' showQRCode   e, ,   ： ', e);
  };

  return (
    <SmartTable
      columns={columns}
      // rowKey={'code'}
      isQRCode
      {...props}
    ></SmartTable>
  );
};

AssetsTable.defaultProps = {
  tdClick: () => {},
};

export default AssetsTable;
