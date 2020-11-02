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

const PowerStationTable = props => {
  console.log(' PowerStationTable  ： ', props); //
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: '户号',
      dataIndex: 'electricity_user',
      d_item: 'id',
    },
    {
      title: '电站名称',
      dataIndex: 'name',
      d_item: 'id',
    },
    {
      title: '业务主体',
      dataIndex: 'business_entity',
      d_item: 'id',
    },
    {
      title: '设备数',
      dataIndex: 'equipment_num',
      d_item: 'id',
    },
    {
      title: '监控点数',
      // dataIndex: '',
      d_item: 'id',
    },
    {
      title: '一次电气图',
      dataIndex: 'file',
      d_item: 'id',
    },
  ];

  return (
    <SmartTable
      columns={columns}
      // dataSource={noCalculateList}
      // rowKey={'source_no'}
      isQRCode
      {...props}
    ></SmartTable>
  );
};

PowerStationTable.defaultProps = {
  // showModal: () => {},
  tdClick: () => {},
  // remove: () => {},
};

export default PowerStationTable;
