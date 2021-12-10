import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import SmartTable from '@/common/SmartTable';

const HouseNoFormTable = props => {
  const columns = [
    {
      title: '电站名称',
    },
    {
      title: '托管电站数',
    },
    {
      title: '设备数量',
    },
    {
      title: '电源编号',
    },
    {
      title: '变压器容量',
    },
    {
      title: '备注',
    },
  ];

  return <SmartTable columns={columns} rowLength={2} {...props}></SmartTable>;
};

export default HouseNoFormTable;
