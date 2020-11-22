import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './style.less';

import SmartTable from '@/common/SmartTable'; //
import { workOrderStatusMap } from '@/configs';

const InspectRecordTable = props => {
  const { showModal, edit, remove, tdClick, showDetail, inspectReport } = props; //

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      d_item: 'id',
      className: 'textCenter',
    },
    {
      title: '名称',
      dataIndex: 'name',
      // d_item: 'id',
      // render: (text, record, index) => (
      //   <a
      //     onClick={() =>
      //       props.getMissionItemAsync({
      //         action: 'inspectMission',
      //         d_id: record.id,
      //         d: record.id,
      //       })
      //     }
      //   >
      //     {text}
      //   </a>
      // ),
      detailFn: record =>
        props.showItemAsync({
          action: 'inspectRecordDetailAsync',
          d_id: record.id,
        }),
    },
    {
      title: '电站',
      dataIndex: ['plan', 'station', 'name'],
    },

    {
      title: '客户名称',
      // dataIndex: 'plan.customer',
      dataIndex: ['plan', 'customer'],
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      dataMap: workOrderStatusMap,
    },

    {
      title: '领取人',
      dataIndex: ['team', 'team_headman'],
    },

    {
      title: '领取时间',
      dataIndex: 'work_date',
    },
    {
      title: '领取时间',
      dataIndex: 'assign_date',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      {/* <a onClick={() => showDetail({ action: 'detail', d_id: record.id })}>
        巡检报告
      </a> */}
      <a onClick={() => props.edit({ action: 'detail', d_id: record.id })}>
        巡检报告
      </a>
      <a
        onClick={() => {
          // props.showFormModal({ action: 'inspectReport' })
          // props.showExportPdf({ action: 'showExportPdf', d_id: record.id });
          props.showExportPdf({
            action: 'detail',
            extraAction: 'showExportPdf',
            d_id: record.id,
          });
          // setTimeout(() => {
          //   window.print()
          // }, 3000)
        }}
      >
        导出巡检报告
      </a>
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

InspectRecordTable.defaultProps = {
  tdClick: () => {},
};

export default InspectRecordTable;
