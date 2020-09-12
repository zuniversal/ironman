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

const HouseNoFormTable = props => {
  console.log(' HouseNoFormTable  ： ', props); //
  const { tdClick,    } = props; //

  const columns = [
    {
      title: '电站名称',
      render: (text, record, index) => <a onClick={() => tdClick({action: 'detail'})}>{text}</a>,
    },
    {
      title: '电源编号',
    },
    {
      title: '托管电站数',
    },
    {
      title: '变压器容量',
    },
    {
      title: '设备数量',
    },
    {
      title: '备注',
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
      rowLength={2}
      {...props}
    ></SmartTable>
  );
};

HouseNoFormTable.defaultProps = {
  // showModal: () => {},
  tdClick: () => {},
  // remove: () => {},
};

export default HouseNoFormTable;