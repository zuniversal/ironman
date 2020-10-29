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
      detailFn: (text, record, index) => showDetail(record.id),
    },
    {
      title: '户号',
      dataIndex: 'code',
      detailFn: (text, record, index) => showDetail(record.id),
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
      title: '托管电站数',
      dataIndex: 'electricityuser_num',
      detailFn: (text, record, index) => showDetail(record.id),
    },
    {
      title: '录入日期',
      dataIndex: 'create_time',
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

HouseNoTable.defaultProps = {
  // showModal: () => {},
  tdClick: () => {},
  // remove: () => {},
};

export default HouseNoTable;
