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

const ShiftsManageTable = props => {
  console.log(' ShiftsManageTable  ： ', props); //
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: '班组名称',
      dataIndex: 'name',
    },
    {
      title: '组长',
      dataIndex: 'team_headman',
    },
    {
      title: '组员',
      // dataIndex: ['member', ''],
      dataIndex: 'team_hememberadman',
    },
    {
      title: '班组类型',
      dataIndex: 'type',
    },
    {
      title: '车辆牌照',
      dataIndex: 'car_number',
    },
  ];

  const extra = props => (
    <>
      <a onClick={() => tdClick({ action: 'showList' })}>查看排班</a>
    </>
  );

  return (
    <SmartTable
      columns={columns}
      // dataSource={noCalculateList}
      // rowKey={'source_no'}
      extra={extra}
      // noDefault
      {...props}
    ></SmartTable>
  );
};

ShiftsManageTable.defaultProps = {
  tdClick: () => {},
};

export default ShiftsManageTable;
