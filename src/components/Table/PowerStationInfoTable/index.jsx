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

import SmartTable from '@/common/SmartTable'; //

export const DeviceInfoTable = props => {
  console.log(' DeviceInfoTable  ： ', props); //
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: '设备编号 ',
      dataIndex: '',
    },
    {
      title: '设备名称',
      dataIndex: '',
    },
    {
      // title: '电压容量',
      title: '变压容量',
      dataIndex: '',
    },
    {
      title: '实际使用用量',
      dataIndex: '',
    },
    {
      title: '备注',
      dataIndex: '',
    },
  ];

  return (
    <SmartTable
      noActionCol
      columns={columns}
      // dataSource={noCalculateList}
      // rowKey={'source_no'}

      rowLength={1}
      {...props}
    ></SmartTable>
  );
};

export const WatchInfoTable = props => {
  console.log(' WatchInfoTable  ： ', props); //
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: '监控点编号',
      dataIndex: '',
    },
    {
      title: '监控点名称',
      dataIndex: '',
    },
    {
      // title: '统计数量',
      // render: (text, record, index) => <a onClick={() => tdClick({action: 'detail'})}>{text}</a>,
      title: '监控设备',
      dataIndex: '',
    },
    {
      title: '状态',
      dataIndex: '',
    },
    {
      title: '备注',
      dataIndex: '',
    },
  ];

  return (
    <SmartTable
      noActionCol
      columns={columns}
      // dataSource={noCalculateList}
      // rowKey={'source_no'}

      rowLength={1}
      {...props}
    ></SmartTable>
  );
};
