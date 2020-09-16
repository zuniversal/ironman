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

const InspectMissionTable = props => {
  console.log(' InspectMissionTable  ： ', props); //
  const { showModal, edit, remove, tdClick,    } = props; //

  const columns = [
    {
      d: 'id',
      dataIndex: 'id',
    },
    {
      d: '名称',
      dataIndex: 'name',
    },
    {
      d: '电站',
      dataIndex: '',
    },
    
    {
      d: '客户名称',
      dataIndex: '',
    },
    {
      d: '当前状态',
      dataIndex: 'status',
    },
    
    {
      d: '领取人',
      dataIndex: '',
    },
    
    {
      d: '执行时间',
      dataIndex: 'work_date',
    },
    {
      d: '领取时间',
      dataIndex: 'assign_date',
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

InspectMissionTable.defaultProps = {
  tdClick: () => {},
  
};

export default InspectMissionTable;
