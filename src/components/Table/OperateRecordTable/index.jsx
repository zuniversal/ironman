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

const MsgTable = props => {
  console.log(' MsgTable  ： ', props); //
  const { showModal, edit, remove, tdClick,    } = props; //

  const columns = [
        
    {
      title: 'id',
    },
    {
      title: '模块',
    },
    {
      title: '操作',
    },
    {
      title: '操作人',
    },
    {
      title: '操作内容',
    },
    {
      title: '操作时间',
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

MsgTable.defaultProps = {
  tdClick: () => {},
  
};

export default MsgTable;
