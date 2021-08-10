import React from 'react';
import './style.less';

import SmartTable from '@/common/SmartTable';
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

  const manufacturerModelList = [];
  manufacturerList.forEach(v =>
    manufacturerModelList.push(...formatSelectList(v.models)),
  );

  const columns = [
    {
      title: 'IMEI号',
      dataIndex: 'imei',
    },
    {
      title: '厂商',
      dataIndex: 'manufacturer',
      dataMap: arrMapObj(manufacturerList),
    },
    // {
    //   title: '检测点id',
    //   dataIndex: 'monitor_point_id',
    // },
    // {
    //   title: '检测点名称',
    //   dataIndex: 'monitor_point_name',
    // },
    {
      title: '型号',
      dataIndex: 'model',
      dataMap: arrMapObj(manufacturerModelList),
    },
    {
      title: '物联网卡号',
      title: 'ICCID',
      dataIndex: 'iccid',
    },
    // {
    //   title: '压变',
    //   dataIndex: 'voltage_ratio',
    // },
    // {
    //   title: '流变',
    //   dataIndex: 'current_ratio',
    // },

    // {
    //   title: '户号',
    //   dataIndex: '',
    // },
    // {
    //   title: '安装点位',
    //   dataIndex: '',
    // },
    // {
    //   title: '电源编号',
    //   dataIndex: '',
    // },
    // {
    //   title: '出库登记',
    //   dataIndex: '',
    // },

    {
      // noCutText: true,
      // width: 400,
      title: '所属客户',
      dataIndex: 'customer_name',
      detailFn: record =>
        props.showItemAsync({
          action: 'clientDetailAsync',
          d_id: record.customer_id,
        }),
    },
    {
      title: '所属户号',
      dataIndex: 'number',
      detailFn: record =>
        props.showItemAsync({
          action: 'houseNoDetailAsync',
          d_id: record.electricity_user_id,
        }),
    },
    {
      title: '电源编号',
      dataIndex: 'power_number',
    },
    {
      title: '安装点位',
      dataIndex: 'monitor_point_name',
    },

    {
      title: '网络类型',
      dataIndex: 'network_type',
      dataMap: networkTypeMap,
    },
    {
      title: '状态',
      dataIndex: 'status',
      dataMap: monitorDeviceStatusMap,
    },
    {
      title: '备注',
      dataIndex: 'comments',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        disabled={!record.imei}
        onClick={() => {
          record.imei &&
            props.showFormModal({
              action: 'getRealDataAsync',
              realDataParams: {
                imei: record.imei,
              },
            });
        }}
      >
        监控数据
      </a>
    </>
  );

  return <SmartTable columns={columns} extra={extra} {...props}></SmartTable>;
};

MonitorDeviceTable.defaultProps = {};

export default MonitorDeviceTable;
