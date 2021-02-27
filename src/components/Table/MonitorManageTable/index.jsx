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
import { monitorDeviceStatusMap } from '@/configs';

const MonitorManageTable = props => {
  const columns = [
    {
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
      dataIndex: 'number',
      detailFn: record =>
        props.showItemAsync({
          action: 'houseNoDetailAsync',
          d_id: record.electricity_user_id,
        }),
    },
    {
      title: '电站',
      dataIndex: 'power_station_name',
      detailFn: record =>
        props.showItemAsync({
          action: 'powerStationDetailAsync',
          d_id: record.station_id,
        }),
    },
    {
      title: '设备名称',
      dataIndex: 'equipment_name',
      detailFn: record =>
        props.showItemAsync({
          action: 'assetsDetailAsync',
          d_id: record.equipment_id,
          id: record.device_id,
        }),
    },
    {
      title: '关联设备',
      dataIndex: 'device_id',
      // detailFn: record =>
      //   props.showItemAsync({
      //     action: 'monitorDeviceDetailAsync',
      //     d_id: record.device_id,
      //   }),
    },
    {
      title: '监测点',
      dataIndex: 'name',
    },
    // {
    //   title: '设备类型',
    //   dataIndex: '',
    // },
    {
      title: 'IEMI号',
      dataIndex: 'imei',
    },
    {
      title: '上传频率',
      dataIndex: 'frequency',
    },
    {
      title: '状态',
      dataIndex: 'status',
      dataMap: monitorDeviceStatusMap,
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() => {
          console.log('Received values of form: ', props);
          props.showQRCode({
            title: `${record.name}`,
            dataIndex: '',
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
      isQRCode
      {...props}
    ></SmartTable>
  );
};

MonitorManageTable.defaultProps = {};

export default MonitorManageTable;
