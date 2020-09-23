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

const HouseNoTable = props => {
  console.log(' HouseNoTable  ： ', props); //
  const { tdClick } = props; //

  const columns = [
    {
      title: '所属客户',
      dataIndex: 'customer',
      render: (text, record, index) => (
        <a onClick={() => tdClick({ action: 'detail' })}>{text}</a>
      ),
    },
    {
      title: '户号',
      dataIndex: 'code',
      render: (text, record, index) => (
        <a onClick={() => tdClick({ action: 'detail' })}>{text}</a>
      ),
    },
    {
      title: '签约公司',
      dataIndex: 'signing_company',
    },
    {
      title: '客户代表',
      dataIndex: 'customer_representative',
    },
    {
      title: '电站数',
      dataIndex: 'electricityuser',
      render: (text, record, index) => (
        <a onClick={() => tdClick({ action: 'detail' })}>{text}</a>
      ),
    },
    {
      title: '录入日期',
      dataIndex: 'field6',
    },
  ];

  return (
    <SmartTable
      columns={columns}
      // dataSource={noCalculateList}
      // rowKey={'source_no'}
      isQRCode
      // actionConfig={{
      //   isQRCode: true,
      // }}
      {...props}
    ></SmartTable>
  );
};

HouseNoTable.defaultProps = {
  // showModal: () => {},
  tdClick: () => {},
  // remove: () => {},
};

export default HouseNoTable;
