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

const GoodsTable = props => {
  console.log(' GoodsTable  ： ', props); //
  const { showModal, edit, remove, tdClick,    } = props; //

  const columns = [
    {
      title: '物料编号',
    },
    {
      title: '物料名称',
    },
    {
      title: '物料规格',
    },
    {
      title: '物料单位',
    },
    {
      title: '单价(元)',
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

GoodsTable.defaultProps = {
  tdClick: () => {},
  
};

export default GoodsTable;
