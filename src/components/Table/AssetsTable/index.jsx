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
      render: (text, record, index) => <a onClick={() => tdClick({action: 'detail'})}>{text}</a>,
    },
    {
      title: '户号',
      render: (text, record, index) => <a onClick={() => tdClick({action: 'detail'})}>{text}</a>,
    },
    {
      title: '电站',
      render: (text, record, index) => <a onClick={() => tdClick({action: 'detail'})}>{text}</a>,
    },
    {
      title: '设备名称',
      render: (text, record, index) => <a onClick={() => tdClick({action: 'detail'})}>{text}</a>,
    },
    {
      title: '设备型号',
    },
    {
      title: '变压容量',
    },
    {
      title: '出厂日期',
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
      extra={
        <a onClick={() => tdClick({action: 'detail'})}>生成二维码</a>
      }
      {...props}
    ></SmartTable>
  );
};

AssetsTable.defaultProps = {
  tdClick: () => {},
  
};

export default AssetsTable;
