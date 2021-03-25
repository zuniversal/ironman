import React from 'react';
import './style.less';

import SmartTable from '@/common/SmartTable'; //
import { monitorDeviceStatusMap, networkTypeMap } from '@/configs';
import useHttp from '@/hooks/useHttp';
import { getManufacturerList } from '@/services/monitorManage';
import { formatSelectList, arrMapObj } from '@/utils';

const MonitorDeviceTable = props => {
  const commonParams = {
    init: [],
    format: res => formatSelectList(res, 'manufacturer'),
  };
  const { data: manufacturerList, req: getManufacturerListAsync } = useHttp(
    getManufacturerList,
    {
      ...commonParams,
    },
  );

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: '厂商',
      dataIndex: 'manufacturer',
      dataMap: arrMapObj(manufacturerList),
    },
    {
      title: '检测点id',
      dataIndex: 'monitor_point_id',
    },
    {
      title: '检测点名称',
      dataIndex: 'monitor_point_name',
    },
    {
      title: '型号',
      dataIndex: 'model',
    },
    {
      title: 'IMEI号',
      dataIndex: 'imei',
    },
    {
      title: '压变',
      dataIndex: 'voltage_ratio',
    },
    {
      title: '流变',
      dataIndex: 'current_ratio',
    },
    {
      title: '网络类型',
      dataIndex: 'manufacturer',
      dataMap: networkTypeMap,
    },
    {
      title: '状态',
      dataIndex: 'status',
      dataMap: monitorDeviceStatusMap,
    },
  ];

  return <SmartTable columns={columns} {...props}></SmartTable>;
};

MonitorDeviceTable.defaultProps = {};

export default MonitorDeviceTable;
