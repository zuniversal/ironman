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
  const { showModal, edit, remove, tdClick,    } = props; //

  const columns = [
    {
      title: '所属客户',
      dataIndex: 'client',
      render: (text, record, index) => <a onClick={() => tdClick({action: 'detail'})}>{text}</a>,
    },
    {
      title: '户号',
      dataIndex: 'signing_company',
      render: (text, record, index) => <a onClick={() => tdClick({action: 'detail'})}>{text}</a>,
    },
    {
      title: '电站',
      dataIndex: 'customer_representative',
      render: (text, record, index) => <a onClick={() => tdClick({action: 'detail'})}>{text}</a>,
    },
    {
      title: '设备名称',
      dataIndex: 'name',
      render: (text, record, index) => <a onClick={() => tdClick({action: 'detail'})}>{text}</a>,
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

  
  const showQRCode = (e, ) => {
    console.log(' showQRCode   e, ,   ： ', e,   )
    
  }


  return (
    <SmartTable
      columns={columns}
      // dataSource={noCalculateList}
      // rowKey={'source_no'}
      extra={
        <a onClick={showQRCode}>生成二维码1</a>
      }
      {...props}
    ></SmartTable>
  );
};

AssetsTable.defaultProps = {
  tdClick: () => {},
  
};

export default AssetsTable;
