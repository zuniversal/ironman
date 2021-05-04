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

const AssetsTable = props => {
  const columns = [
    {
      noFilter: true,
      noCutText: true,
      width: 300,
      title: '所属客户',
      dataIndex: ['electricity_user', 'customer'],
      detailFn: record =>
        props.showItemAsync({
          action: 'clientDetailAsync',
          d_id: record.electricity_user.customer.id,
        }),
    },
    {
      title: '户号',
      dataIndex: 'code',
      dataIndex: ['electricity_user', 'number'],
      detailFn: record =>
        props.showItemAsync({
          action: 'houseNoDetailAsync',
          // d_id: record.electricity_user.id,
          d_id: record.id,
        }),
    },
    {
      title: '电站',
      dataIndex: ['station', 'name'],
      // render: (text, record, index) => (
      //   <a onClick={() => showDetail({ action: 'detail' })}>{text}</a>
      // ),
      detailFn: record =>
        props.showItemAsync({
          action: 'powerStationDetailAsync',
          d_id: record.station.id,
        }),
    },
    {
      title: '设备名称',
      title: '资产名称',
      dataIndex: 'name',
      // render: (text, record, index) => (
      //   <a onClick={() => showDetail({ action: 'detail' })}>{text}</a>
      // ),
      detailFn: record =>
        props.showItemAsync({
          action: 'assetsDetailAsync',
          d_id: record.id,
          // 资产 详情
          id: record.id,
        }),
    },
    {
      title: '电源编号',
      //   dataIndex: 'electrical_info_id',
      dataIndex: 'power_number',
    },
    {
      title: '进线侧名称',
      dataIndex: '',
    },
    {
      title: '资产类型',
      dataIndex: '',
    },
    // {
    //   title: '设备型号',
    //   dataIndex: 'model',
    // },
    // {
    //   title: '变压容量',
    //   dataIndex: 'transformer_capacity',
    // },
    // {
    //   title: '出厂日期',
    //   dataIndex: 'production_date',
    // },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text, record, index) => (text ? '正常' : '异常'),
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() => {
          console.log('Received values of form: ', props);
          props.showQRCode({
            title: `${record.name}`,
            record,
            d_id: record.id,
          });
        }}
      >
        生成二维码
      </a>
    </>
  );

  return (
    <SmartTable
      columns={columns}
      extra={extra}
      // rowKey={'code'}
      isQRCode
      {...props}
    ></SmartTable>
  );
};

AssetsTable.defaultProps = {};

export default AssetsTable;
