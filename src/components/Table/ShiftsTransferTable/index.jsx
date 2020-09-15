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

const ShiftsTransferTable = props => {
  console.log(' ShiftsTransferTable  ： ', props); //
  const { showModal, edit, remove, tdClick,    } = props; //

  const columns = [
    {
      title: 'id',
    },
    {
      title: '交班人',
    },
    {
      title: '接班人',
    },
    {
      title: '类型',
    },
    {
      title: '创建时间',
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

ShiftsTransferTable.defaultProps = {
  tdClick: () => {},
  
};

export default ShiftsTransferTable;
