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

const CsClientReportTable = props => {
  console.log(' CsClientReportTable ： ', props); //
  const { tdClick, add, edit, showDetail } = props; //

  const columns = [
    {
      title: '报告名称',
      dataIndex: 'name',
    },
    {
      title: '报告类型',
      dataIndex: 'name',
    },
    {
      title: '报告时间',
      dataIndex: 'name',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a onClick={() => showDetail({ action: 'detail' })}>查看加急账单</a>
      <a onClick={() => add({ action: 'add' })}>录入</a>
      <a onClick={() => edit({ action: 'edit' })}>修改</a>
      <a onClick={() => props.showFormModal({ action: 'pdf' })}>打印</a>
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

CsClientReportTable.defaultProps = {
  showModal: () => {},
};

export default CsClientReportTable;
