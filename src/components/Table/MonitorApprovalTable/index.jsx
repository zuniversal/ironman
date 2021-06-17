import React from 'react';
import './style.less';

import SmartTable from '@/common/SmartTable';
import { monitorApprovalMap, APPROVAL_PASS, WAIT_APPROVAL } from '@/configs';
import { formatSelectList, arrMapObj } from '@/utils';

const MonitorApprovalTable = props => {
  const columns = [
    {
      title: '工程编号',
      dataIndex: 'order_code',
    },
    {
      title: 'IMEI',
      dataIndex: 'imei',
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
      title: '额定功率',
      dataIndex: 'power',
    },

    // {
    //   title: '汇报时间',
    //   dataIndex: '',
    // },
    // {
    //   title: '上线时间',
    //   dataIndex: '',
    // },
    // {
    //   title: '审批通过时间',
    //   dataIndex: '',
    // },

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

  // 待上线—待审批—已通过
  const extra = (text, record, index, props) => (
    <>
      {record.status == APPROVAL_PASS && (
        <a
          onClick={() => {
            props.edit({
              action: 'approval',
              // props.showFormModal({
              //   action: 'approval',
              d_id: record.id,
            });
          }}
        >
          监控上线
        </a>
      )}
      {record.status == WAIT_APPROVAL && (
        <a
          onClick={() => {
            props.edit({
              action: 'approvalPass',
              d_id: record.id,
            });
          }}
        >
          审批
        </a>
      )}
      <a
        onClick={() => {
          props.showItemAsync({
            action: 'monitorApprovalDetailAsync',
            d_id: record.id,
          });
        }}
      >
        详情
      </a>
      <a
        onClick={() => {
          props.showFormModal({
            action: 'getRealDataAsync',
            realDataParams: {
              imei: record.imei,
            },
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
