import React, { useState, useEffect } from 'react';
import SmartTable from '@/common/SmartTable';
import { monitorDeviceStatusMap, deviceFrequencyMap } from '@/configs';
import * as monitorManageServices from '@/services/monitorManage';
import './style.less';
import { tips } from '@/utils';

const ElectricInfoTable = props => {
  const [dataList, setDataList] = useState();
  console.log(' ElectricInfoTableElectricInfoTable,   , ： ', props);
  const getListAsync = async () => {
    const res = await monitorManageServices.getList({
      electricity_user_id: props.houseNo,
    });
    console.log(' ElectricInfoTable ElectricInfoTableres,  , ： ', res);
    setDataList(res.list);
  };
  useEffect(() => {
    console.log(' ElectricInfoTableElectricInfoTable, 副作用  , ： ', props);
    // .then(res => {
    //   console.log(' ElectricInfoTableres,  , ： ', res);
    // })
    if (props.houseNo) {
      getListAsync();
    }
  }, [props.houseNo]);
  console.log(' ElectricInfoTableres, dataList , ： ', dataList);

  const columns = [
    {
      noCutText: true,
      width: 350,
      title: 'IMEI号',
      dataIndex: 'imei',
    },
    {
      title: '监控点',
      dataIndex: 'name',
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
      title: '额定功率',
      dataIndex: 'power',
    },
    // {
    //   title: '设备类型',
    //   dataIndex: '',
    // },
    {
      title: '上传频率',
      dataIndex: 'frequency',
      dataMap: deviceFrequencyMap,
    },
    {
      title: 'ICCID号',
      dataIndex: 'iccid',
    },
    {
      title: '上线时间',
      dataIndex: 'created_time',
      day: 'YYYY-MM-DD HH:mm:ss',
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
          if (record.imei) {
            props.showFormModal({
              // props.getRealDataAsync({
              action: 'getRealDataAsync',
              realDataParams: {
                imei: record.imei,
              },
            });
          } else {
            tips('没有IMEI号可以查看监控数据！');
          }

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
      noDefault
      // noDefault
      {...props}
      dataSource={dataList}
    ></SmartTable>
  );
};

ElectricInfoTable.defaultProps = {};

export default ElectricInfoTable;
