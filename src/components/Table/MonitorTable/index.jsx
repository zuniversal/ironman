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

const MonitorTable = props => {
  console.log(' MonitorTable  ： ', props); //
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: '所属客户',
    },
    {
      title: '户号',
    },
    {
      title: '电站',
    },
    {
      title: '设备名称',
    },
    {
      title: '关联设备',
    },
    {
      title: '监测点',
    },
    {
      title: '设备类型',
    },
    {
      title: 'IEMI号',
    },
    {
      title: '状态',
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

MonitorTable.defaultProps = {
  tdClick: () => {},
};

export default MonitorTable;
