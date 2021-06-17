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

import SmartTable from '@/common/SmartTable';
import { missionsStatusMap } from '@/configs';

const WeakTable = props => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      className: 'textCenter',
    },

    {
      title: '缺陷描述',
      dataIndex: 'name',
      detailFn: record =>
        props.showItemAsync({
          action: 'weakDetailAsync',
          d_id: record.id,
        }),
    },

    {
      noCutText: true,
      width: 300,
      title: '电站',
      dataIndex: ['station', 'name'],
      detailFn: record =>
        props.showItemAsync({
          action: 'powerStationDetailAsync',
          d_id: record.station.id,
        }),
    },

    {
      noCutText: true,
      width: 400,
      title: '客户名称',
      dataIndex: ['customer', 'name'],
      detailFn: record =>
        props.showItemAsync({
          action: 'clientDetailAsync',
          d_id: record.customer.id,
        }),
    },

    {
      title: '反馈人',
      dataIndex: ['team', 'name'],
    },

    {
      title: '反馈时间',
      dataIndex: 'created_time',
      day: 'YYYY-MM-DD HH:mm:ss',
    },

    // {
    //   title: '处理状态',
    //   dataIndex: 'status',
    //   dataMap: missionsStatusMap,
    // },

    // {
    //   title: '备注',
    //   dataIndex: 'remark',
    // },
  ];

  const extra = (text, record, index, props) => (
    <>
      {/* <a onClick={() => props.showDetail({ action: 'handleWeak', d_id: record.id })}>处理</a> */}
      {record.status === 'completed' ? (
        <a disabled className={`disabled `}>
          已处理
        </a>
      ) : (
        <a
          onClick={() =>
            // props.handleWeakAsync({
            props.handleAction({
              action: 'handleWeak',
              d_id: record.id,
              id: record.id,
            })
          }
        >
          处理
        </a>
      )}
      {/* <a onClick={() => tdClick({ action: 'showList' })}>通知客户</a> */}
      {/* <a onClick={() => props.exportDataAsync({ action: 'showList' })}>导出</a> */}
      {/* <a onClick={() => props.showExportPdf({ action: 'detail', extraAction: 'showExportPdf', d_id: record.id })} > */}
      {/* <a
        onClick={() =>
          props.edit({
            action: 'detail',
            extraAction: 'showExportPdf',
            d_id: record.id,
          })
        }
      >
        导出
      </a> */}
      <a
        onClick={
          () =>
            props.exportDataAsync({
              action: 'exportData',
              team_id: record.team.id,
            })
          // tips('暂无接口！', 2)
        }
      >
        导出
      </a>

      {/* <a
        onClick={() =>
          props.exportPdf({
            action: 'detail',
            extraAction: 'showExportPdf',
            d_id: record.id,
          })
        }
      >
        导出
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

export default WeakTable;
