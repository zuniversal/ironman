import React from 'react';
import './style.less';

import SmartTable from '@/common/SmartTable';
import { monitorPointStatusMap, deviceFrequencyMap } from '@/configs';

const MonitorManageTable = props => {
  const columns = [
    {
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
    // {
    //   title: '电源编号',
    //   dataIndex: '',
    // },
    {
      title: '关联设备名称',
      dataIndex: 'equipment_name',
      detailFn: record =>
        props.showItemAsync({
          action: 'assetsDetailAsync',
          d_id: record.equipment_id,
          id: record.device_id,
        }),
    },
    {
      title: '电源编号',
      dataIndex: 'power_number',
    },
    {
      title: '监控点',
      dataIndex: 'name',
      detailFn: record =>
        props.showItemAsync({
          action: 'monitorManageDetailAsync',
          d_id: record.id,
        }),
    },
    {
      title: '额定功率',
      dataIndex: 'power',
    },
    {
      title: '设备厂商',
      dataIndex: 'manufacturer',
    },
    {
      width: 160,
      title: 'IMEI号',
      dataIndex: 'imei',
    },
    {
      title: '上传频率',
      dataIndex: 'frequency',
      dataMap: deviceFrequencyMap,
    },
    {
      title: 'ICCID号',
      dataIndex: 'iccid',
    },

    // {
    //   title: '电源编号',
    //   dataIndex: '',
    // },
    // {
    //   title: '设备厂商',
    //   dataIndex: '',
    // },

    {
      title: '上线时间',
      dataIndex: 'created_time',
      day: 'YYYY-MM-DD HH:mm:ss',
    },
    {
      title: '状态',
      dataIndex: 'status',
      dataMap: monitorPointStatusMap,
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        disabled={!record.imei}
        onClick={() => {
          record.imei &&
            props.showFormModal({
              // props.getRealDataAsync({
              action: 'getRealDataAsync',
              realDataParams: {
                imei: record.imei,
              },
            });
          // props.showItemAsync({
          //   // props.getRealDataAsync({
          //   action: 'getRealDataAsync',
          //   serviceKey: 'monitorManageServices',
          //   realDataParams: {
          //     imei: record.imei,
          //   },
          // });
        }}
      >
        监控数据
      </a>
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
      // noDefault
      {...props}
    ></SmartTable>
  );
};

MonitorManageTable.defaultProps = {};

export default MonitorManageTable;
