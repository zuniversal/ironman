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

const InspectRecordTable = props => {
  console.log(' InspectRecordTable  ： ', props); //
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: 'id',
    },
    {
      title: '名称',
    },
    {
      title: '电站',
    },
    {
      title: '客户名称',
    },
    {
      title: '当前状态',
    },
    {
      title: '领取人',
    },
    {
      title: '领取时间',
    },
    {
      title: '完成时间',
    },
  ];

  const extra = props => (
    <>
      <a onClick={() => tdClick({ action: 'showList' })}>巡检报告</a>
      <a onClick={() => tdClick({ action: 'showList' })}>导出巡检报告</a>
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

InspectRecordTable.defaultProps = {
  tdClick: () => {},
};

export default InspectRecordTable;
