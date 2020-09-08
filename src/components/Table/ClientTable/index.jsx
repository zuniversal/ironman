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

const ClientTable = props => {
  console.log(' ClientTable ： ', props); //
  const { tdClick,  } = props; //

  const columns = [
    {
      title: '客户编号',
      dataIndex: 'key',
      // link: true,
      render: (text, record, index) => <a onClick={() => tdClick({action: 'detail'})}>{text}</a>,
    },
    {
      noFilter: true,
      title: '客户名称',
      dataIndex: 'field2',
    },
    {
      // noFilter: true,
      title: '客户类型',
      dataIndex: 'field3',
    },
    {
      // noFilter: true,
      title: '所属行业',
      dataIndex: 'field4',
    },
    {
      // noFilter: true,
      title: '企业规模',
      dataIndex: 'field5',
    },
    {
      title: '资产规模',
      dataIndex: 'field6',
    },
    {
      title: '管理员',
      dataIndex: 'field7',
    },
    {
      title: '户号',
      dataIndex: 'field8',
    },
    {
      title: '客户地址',
      dataIndex: 'field9',
    },
  ];

  return (
    <SmartTable
      columns={columns}
      // dataSource={noCalculateList}
      // rowKey={'source_no'}
      {...props}
    ></SmartTable>
  );
};

ClientTable.defaultProps = {
  showModal: () => {},
};

export default ClientTable;
