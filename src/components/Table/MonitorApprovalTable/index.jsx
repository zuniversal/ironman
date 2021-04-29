import React from 'react';
import './style.less';

import SmartTable from '@/common/SmartTable';
import { monitorApprovalMap } from '@/configs';
import { formatSelectList, arrMapObj } from '@/utils';

const MonitorApprovalTable = props => {
  const columns = [
    {
      title: '工程编号',
      dataIndex: 'order_code',
    },
    {
      title: '设备编号',
      dataIndex: 'id',
    },
    {
      noCutText: true,
      width: 300,
      title: '客户',
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
    // {
    //   title: '电站',
    //   dataIndex: 'name',
    //   detailFn: record =>
    //     props.showItemAsync({
    //       action: 'powerStationDetailAsync',
    //       d_id: record,
    //     }),
    // },
    // {
    //   title: '电源编号',
    //   //   dataIndex: 'electrical_info_id',
    //   dataIndex: 'power_number',
    // },
    {
      title: '点位名称',
      dataIndex: 'monitor_point_name',
    },
    {
      title: '施工人员',
      dataIndex: 'worker_name',
    },
    {
      title: '状态',
      dataIndex: 'status',
      dataMap: monitorApprovalMap,
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      {true ? (
        <a
          onClick={() => {
            props.edit({
              action: 'approval',
              // props.showFormModal({
              //   action: 'approval',
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
              action: 'approvalPass',
              record,
              d_id: record,
            });
          }}
        >
          监控上线
        </a>
      )}
      {/* <a
        onClick={() => {
          props.showFormModal({
            action: 'viewMonitor',
            record,
            d_id: record,
          });
        }}
      >
        查看监控
      </a> */}
      {/* <a
        onClick={() => {
          props.showFormModal({
            action: 'closeMission',
            record,
            d_id: record,
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
