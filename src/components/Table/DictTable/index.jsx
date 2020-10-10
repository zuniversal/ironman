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

const DictTable = props => {
  console.log(' DictTable  ： ', props); //
  const { showModal, edit, remove, tdClick,    } = props; //

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '模块',
      dataIndex: 'content',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '枚举值',
      dataIndex: 'value',
    },
    {
      title: '关联设备',
      dataIndex: ['equipment', 'id'],
    },
    {
      title: '备注',
      dataIndex: 'remark',
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

DictTable.defaultProps = {
  tdClick: () => {},
  
};

export default DictTable;
