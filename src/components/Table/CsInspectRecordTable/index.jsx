import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import SmartTable from '@/common/SmartTable';
import { missionsStatusMap } from '@/configs';

const CsInspectRecordTable = props => {
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
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
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      dataMap: missionsStatusMap,
    },
    {
      title: '巡检日期',
      dataIndex: 'created_time',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      {/* <a onClick={() => props.showFormModal({ action: 'detail' })}>查看详情</a> */}
      {/* <a
        onClick={() =>
          props.showItemAsync({
            action: 'inspectRecordDetailAsync',
            d_id: record.id,
          })
        }
      >
        查看详情
      </a> */}
      <a onClick={() => props.edit({ action: 'detail', d_id: record.id })}>
        巡检报告
      </a>
      <a
        onClick={() => {
          props.showExportPdf({
            action: 'detail',
            extraAction: 'showExportPdf',
            d_id: record.id,
          });
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

export default CsInspectRecordTable;
