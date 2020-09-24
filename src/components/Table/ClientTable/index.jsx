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
import { HOUSENO } from '@/constants'; //
import { linkUrlFn } from '@/utils'; //

const ClientTable = props => {
  console.log(' ClientTable ： ', props); //
  const { tdClick } = props; //

  const columns = [
    {
      title: '客户编号',
      dataIndex: 'id',
      // link: true,
      // render: (text, record, index) => <a onClick={() => tdClick({action: 'detail'})}>{text}</a>,
      linkUrlFn: linkUrlFn(['code', 'id', 'ids'], HOUSENO),
    },
    {
      noFilter: true,
      detail: true,
      title: '客户名称',
      dataIndex: 'electricity_user',
    },
    {
      // noFilter: true,
      title: '客户类型',
      dataIndex: 'business_entity',
    },
    {
      // noFilter: true,
      title: '所属行业',
      dataIndex: 'equipment',
    },
    {
      // noFilter: true,
      title: '企业规模',
      dataIndex: 'Monitoring',
    },
    {
      title: '资产规模',
      dataIndex: 'create_time',
    },
    {
      detail: true,
      title: '管理员',
      dataIndex: 'admin',
    },
    {
      title: '户号',
      dataIndex: 'electricityuser_num',
      // linkUrl: '/om/houseNo',
      // linkUrlFn: (text, record, index) => {
      //   let linkUrl = HOUSENO
      //   let res = ['code', 'id', ].forEach((key) => linkUrl += `${key}=${record[key]}`)
      //   console.log(' linkUrl ： ', linkUrl,  )//
      //   return linkUrl
      // },
      linkUrlFn: linkUrlFn(['code', 'id'], HOUSENO),
    },
    {
      title: '客户地址',
      dataIndex: 'addr',
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
