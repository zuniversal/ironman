import React from 'react';
import './style.less';

import SmartTable from '@/common/SmartTable';
import { monitorDeviceStatusMap } from '@/configs';
import { formatSelectList, arrMapObj } from '@/utils';

const MonitorApprovalTable = props => {
  const columns = [
    {
      title: '工程编号',
      dataIndex: 'id',
    },
    {
      title: '设备编号',
      dataIndex: 'id',
    },
    {
      noCutText: true,
      width: 300,
      title: '客户',
      dataIndex: ['customer', 'name'],
      detailFn: record =>
        props.showItemAsync({
          action: 'clientDetailAsync',
          d_id: record.customer.id,
        }),
    },
    {
      title: '户号',
      dataIndex: ['electricity_user', 'number'],
      detailFn: record =>
        props.showItemAsync({
          action: 'houseNoDetailAsync',
          d_id: record.electricity_user.id,
        }),
    },
    {
      title: '电站',
      dataIndex: 'name',
      detailFn: record =>
        props.showItemAsync({
          action: 'powerStationDetailAsync',
          d_id: record.id,
        }),
    },
    {
      title: '点位名称',
      dataIndex: 'id',
    },
    {
      title: '施工人员',
      dataIndex: 'id',
    },
    {
      title: '状态',
      dataIndex: 'id',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      {true ? (
        <a
          onClick={() => {
            props.showFormModal({
              action: 'add',
              record,
              d_id: record.id,
            });
          }}
        >
          审批
        </a>
      ) : (
        <a
          onClick={() => {
            props.showFormModal({
              action: 'approval',
              record,
              d_id: record.id,
            });
          }}
        >
          监控上线
        </a>
      )}
      <a
        onClick={() => {
          props.showFormModal({
            action: 'closeMission',
            record,
            d_id: record.id,
          });
        }}
      >
        查看监控
      </a>
      {/* <a
        onClick={() => {
          props.showFormModal({
            action: 'closeMission',
            record,
            d_id: record.id,
          });
        }}
      >
        配置告警
      </a> */}
    </>
  );

  return (
    <SmartTable
      columns={columns}
      extra={extra}
      noDefault
      {...props}
    ></SmartTable>
  );
};

MonitorApprovalTable.defaultProps = {};

export default MonitorApprovalTable;
