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
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: '设备编号',
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
      rowLength={1}
      {...props}
    ></SmartTable>
  );
};

export const WatchInfoTable = props => {
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
      rowLength={1}
      {...props}
    ></SmartTable>
  );
};

export const PowerStationDetailTable = props => {
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: '电源编号',
      dataIndex: '',
    },
    {
      title: '电表号',
      dataIndex: '',
    },
    {
      title: '进线名称',
      dataIndex: '',
    },
    {
      title: '倍率',
      dataIndex: '',
    },
    {
      title: '装接容量',
      dataIndex: '',
    },
    {
      title: '实际容量',
      dataIndex: '',
    },
    {
      title: '出线侧设备数',
      dataIndex: '',
    },
  ];

  return <SmartTable columns={columns} noActionCol {...props}></SmartTable>;
};
