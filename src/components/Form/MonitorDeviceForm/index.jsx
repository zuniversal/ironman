import React from 'react';
import './style.less';
import useHttp from '@/hooks/useHttp';
import {
  getManufacturerList,
  getList as getMonitorPointList,
} from '@/services/monitorManage';
import SmartForm from '@/common/SmartForm';
import { monitorDeviceStatusConfig, networkTypeConfig } from '@/configs';
import { formatSelectList, filterObjSame } from '@/utils';

const MonitorDeviceForm = props => {
  const commonParams = {
    init: [],
    format: res => formatSelectList(res),
  };
  const { data: manufacturerList, req: getManufacturerListAsync } = useHttp(
    getManufacturerList,
    {
      ...commonParams,
      format: res => formatSelectList(res, 'manufacturer'),
    },
  );
  const { data: monitorPointList, req: getMonitorPointListAsync } = useHttp(
    () =>
      getMonitorPointList({
        get_all: '1',
      }),
    {
      ...commonParams,
    },
  );

  const manufacturerModelList = [];
  manufacturerList.forEach(v =>
    manufacturerModelList.push(...formatSelectList(v.models)),
  );
  console.log(' MonitorDeviceForm ： ', props, manufacturerModelList);

  const config = [
    {
      // noRule: true,
      formType: 'Search',
      selectSearch: getManufacturerListAsync,
      selectData: manufacturerList,
      itemProps: {
        label: '厂商',
        name: 'manufacturer',
      },
    },
    {
      // noRule: true,
      formType: 'Select',
      selectData: manufacturerModelList,
      itemProps: {
        label: '型号',
        name: 'model',
      },
    },
    {
      // noRule: true,
      formType: 'Select',
      selectData: networkTypeConfig,
      itemProps: {
        label: '网络类型',
        name: 'network_type',
      },
    },
    {
      // noRule: true,
      itemProps: {
        label: 'IMEI号',
        name: 'imei',
      },
    },
    // {
    //   noRule: true,
    //   itemProps: {
    //     label: 'SIM',
    //     name: 'sim',
    //   },
    // },
    {
      noRule: true,
      formType: 'Select',
      selectData: monitorDeviceStatusConfig,
      itemProps: {
        label: '状态',
        name: 'status',
      },
    },
    {
      noRule: true,
      // formType: 'Select',
      formType: 'Search',
      // selectSearch: getMonitorPointListAsync,
      selectData: monitorPointList,
      itemProps: {
        label: '检测点',
        name: 'monitor_point_id',
      },
    },
  ];
  // model
  // imei
  // network_type
  // sim
  // monitor_point_id

  const {
    status,
    model,
    manufacturer,
    network_type,
    monitor_point_id,
  } = props.init;

  return (
    <div className={'monitorDeviceForm '}>
      <SmartForm
        config={config}
        {...props}
        init={{
          ...props.init,
          status: status ? `${status}` : null,
          model: model ? `${model}` : null,
          manufacturer: manufacturer ? `${manufacturer}` : null,
          network_type: network_type ? `${network_type}` : null,
          monitor_point_id: monitor_point_id ? `${monitor_point_id}` : null,
        }}
      ></SmartForm>
    </div>
  );
};

MonitorDeviceForm.defaultProps = {};

export default MonitorDeviceForm;
