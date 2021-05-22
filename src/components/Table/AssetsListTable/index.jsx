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

import SmartTable from '@/common/SmartTable';

const AssetsListTable = props => {
  const columns = [
    {
      noFilter: true,
      noCutText: true,
      width: 300,
      title: '所属客户',
      dataIndex: 'customer_name',
      detailFn: record =>
        props.showItemAsync({
          action: 'clientDetailAsync',
          d_id: record.customer_id,
        }),
    },
    {
      title: '户号',
      dataIndex: 'code',
      dataIndex: 'number',
      detailFn: record =>
        props.showItemAsync({
          action: 'houseNoDetailAsync',
          // d_id: record.electricity_user.id,
          d_id: record.electricity_user_id,
        }),
    },
    // {
    //   title: '电站',
    //   dataIndex: ['station', 'name'],
    //   // render: (text, record, index) => (
    //   //   <a onClick={() => showDetail({ action: 'detail' })}>{text}</a>
    //   // ),
    //   detailFn: record =>
    //     props.showItemAsync({
    //       action: 'powerStationDetailAsync',
    //       d_id: record.station.id,
    //     }),
    // },
    {
      title: '设备名称',
      // title: '资产名称',
      dataIndex: 'name',
      // detailFn: record =>
      //   props.showItemAsync({
      //     action: 'assetsDetailAsync',
      //     d_id: record.id,
      //     // 资产 详情
      //     id: record.id,
      //   }),
    },
    {
      title: '设备模块',
      dataIndex: 'modular',
    },

    {
      title: '设备类型',
      dataIndex: 'type',
    },
    {
      title: '厂商',
      dataIndex: 'manufacturer',
    },
    {
      title: '型号',
      dataIndex: 'model',
    },
    // {
    //   title: '状态',
    //   dataIndex: 'status',
    //   render: (text, record, index) => (text ? '正常' : '异常'),
    // },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() => {
          props.showItemAsync({
            action: 'assetsDetailAsync',
            d_id: record.id,
          });
        }}
      >
        详情
      </a>
    </>
  );

  return (
    <SmartTable
      columns={columns}
      // noActionCol
      noDefault
      extra={extra}
      // rowKey={'customer_id'}
      {...props}
    ></SmartTable>
  );
};

export default AssetsListTable;
