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

const WeakTable = props => {
  console.log(' WeakTable  ： ', props); //
  const { showModal, edit, remove, tdClick,    } = props; //

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    
    {
      title: '名称',
      dataIndex: 'name',
    },
    
    {
      title: '电站',
      dataIndex: 'station.name',
    },
    
    {
      title: '客户名称',
      dataIndex: '',
    },
    
    {
      title: '反馈人',
      dataIndex: '',
    },
    
    {
      title: '反馈时间',
      dataIndex: '',
    },
    
    {
      title: '处理状态',
      dataIndex: 'status',
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

WeakTable.defaultProps = {
  tdClick: () => {},
  
};

export default WeakTable;
