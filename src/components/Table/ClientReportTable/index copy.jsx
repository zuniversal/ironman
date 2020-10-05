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

const ClientReportTable = props => {
  console.log(' ClientReportTable ： ', props); //
  const { tdClick, add, edit, showPdfModal, showDetail } = props; //

  const columns = [
    {
      title: '户号',
    },
    {
      title: '客户名称',
    },
    {
      title: '客户代表',
    },
    {
      title: '巡检组长',
    },
    {
      title: '电压等级',
    },
    {
      title: '申报/实际MD',
    },
    {
      title: '基本电价',
    },
    {
      title: '基本电价',
    },
    {
      title: '基本电费',
    },
    {
      title: '基本电费',
    },
    {
      title: '利率调整',
    },
    {
      title: '功率因数考核/实际',
    },
    {
      title: '总金额',
    },
    {
      title: '总电量',
    },
  ];

  const extra = props => (
    <>
      <a onClick={() => showDetail({ action: 'detail' })}>查看加急账单</a>
      <a onClick={() => add({ action: 'add' })}>录入</a>
      <a onClick={() => edit({ action: 'edit' })}>修改</a>
      <a onClick={() => showPdfModal({ action: 'pdf' })}>打印</a>
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

ClientReportTable.defaultProps = {
  showModal: () => {},
};

export default ClientReportTable;
