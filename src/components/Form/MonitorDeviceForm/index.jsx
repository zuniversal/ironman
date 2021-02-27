import React from 'react';
import './style.less';
import { getManufacturerList } from '@/services/monitorManage';
import { getList as getMonitorPointList } from '@/services/monitorManage';
import SmartForm from '@/common/SmartForm'; //
import { networkTypeConfig } from '@/configs'; //

const MonitorDeviceForm = props => {
  console.log(' MonitorDeviceForm ： ', props); //

  const commonParams = {
    init: [],
    format: res => formatSelectList(res, 'name'),
  };

  const { data: manufacturerList, req: getManufacturerListAsync } = useHttp(
    getManufacturerList,
    {
      ...commonParams,
    },
  );

  const config = [
    {
      noRule: true,
      formType: 'Search',
      selectSearch: getManufacturerListAsync,
      selectData: manufacturerList,
      itemProps: {
        label: '厂商',
        name: 'manufacturer',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '型号',
        name: 'model',
      },
    },
    {
      noRule: true,
      formType: 'Select',
      selectData: networkTypeConfig,
      itemProps: {
        label: '网络类型',
        name: 'network_type',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: 'IEMI号',
        name: 'imei',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: 'SIM',
        name: 'sim',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '压变',
        name: 'voltage_ratio',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '流变',
        name: 'current_ratio',
      },
    },
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
      itemProps: {
        label: '检测点',
        name: 'monitor_point_id',
      },
    },
  ];

  return (
    <div className={'monitorDeviceForm '}>
      <SmartForm config={config} {...props}></SmartForm>
    </div>
  );
};

MonitorDeviceForm.defaultProps = {};

export default MonitorDeviceForm;
