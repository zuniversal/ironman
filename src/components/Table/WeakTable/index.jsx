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
import { missionsStatusMap } from '@/configs';

const WeakTable = props => {
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      className: 'textCenter',
    },

    {
      title: '名称',
      dataIndex: 'name',
    },

    {
      title: '电站',
      dataIndex: ['station', 'name'],
    },

    {
      title: '客户名称',
      dataIndex: ['customer', 'name'],
    },

    {
      title: '反馈人',
      dataIndex: ['team', 'name'],
    },

    {
      title: '反馈时间',
      dataIndex: 'created_time',
    },

    {
      title: '处理状态',
      dataIndex: 'status',
      dataMap: missionsStatusMap,
    },

    {
      title: '备注',
      dataIndex: 'remark',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      {/* <a onClick={() => props.showDetail({ action: 'handleWeak', d_id: record.id })}>处理</a> */}
      <a
        onClick={() =>
          props.handleWeakAsync({
            action: 'handleWeak',
            d_id: record.id,
            id: record.id,
          })
        }
      >
        处理
      </a>
      {/* <a onClick={() => tdClick({ action: 'showList' })}>通知客户</a> */}
      {/* <a onClick={() => props.exportDataAsync({ action: 'showList' })}>导出</a> */}
      {/* <a onClick={() => props.showExportPdf({ action: 'detail', extraAction: 'showExportPdf', d_id: record.id })} > */}
      <a
        onClick={() =>
          props.edit({
            action: 'detail',
            extraAction: 'showExportPdf',
            d_id: record.id,
          })
        }
      >
        导出
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

WeakTable.defaultProps = {
  tdClick: () => {},
};

export default WeakTable;
