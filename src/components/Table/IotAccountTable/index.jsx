import React from 'react';
import SmartTable from '@/common/SmartTable';
import { simcardStatusMap, validityPeriodMap } from '@/configs';

const IotAccountTable = props => {
  const columns = [
    {
      title: 'ICCID',
      dataIndex: 'iccid',
    },
    {
      title: 'SIM卡号',
      dataIndex: 'sim_number',
    },
    {
      title: 'IMEI',
      dataIndex: 'imei',
    },
    {
      title: '所属客户',
      dataIndex: 'name',
      // detailFn: record =>
      //   props.showItemAsync({
      //     action: 'clientDetailAsync',
      //     d_id: record.customer_id,
      //   }),
    },
    {
      title: '所属户号',
      dataIndex: 'number',
      // detailFn: record =>
      //   props.showItemAsync({
      //     action: 'houseNoDetailAsync',
      //     d_id: record.electricity_user_id,
      //   }),
    },
    {
      title: '开户时间',
      dataIndex: 'start_time',
      day: 'YYYY-MM-DD HH:mm:ss',
    },
    {
      title: '套餐流量',
      dataIndex: 'flow',
    },
    {
      title: '套餐有效期',
      dataIndex: 'validity_period',
      dataMap: validityPeriodMap,
    },
    {
      title: '运营商',
      dataIndex: 'operator',
    },
    {
      title: '供应商',
      dataIndex: 'supplier',
    },
    {
      title: '状态',
      dataIndex: 'status',
      dataMap: simcardStatusMap,
    },
    {
      title: '激活时间',
      dataIndex: 'activate_time',
      day: 'YYYY-MM-DD HH:mm:ss',
      sorter: true,
      sortKey: 'activate_time',
      paramKey: 'order_by',
    },
    {
      title: '到期时间',
      dataIndex: 'end_time',
      day: 'YYYY-MM-DD HH:mm:ss',
      sorter: true,
      sortKey: 'end_time',
      paramKey: 'order_by',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() => {
          props.getMonitorDeviceDetailAsync({
            action: 'getMonitorDeviceDetailAsync',
            keyword: record.sim_number,
          });
        }}
      >
        设备台账
      </a>
    </>
  );

  return <SmartTable columns={columns} extra={extra} {...props}></SmartTable>;
};

IotAccountTable.defaultProps = {};

export default IotAccountTable;
