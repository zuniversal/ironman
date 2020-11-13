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

const InspectRecordTable = props => {
  const { showModal, edit, remove, tdClick, showDetail, inspectReport } = props; //

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '电站',
      dataIndex: ['station', 'name'],
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
      <a onClick={() => props.showFormModal({ action: 'detail' })}>查看详情</a>
      <a onClick={() => props.showExportPdf({ action: 'showExportPdf' })}>
        导出报告
      </a>
    </>
  );

  return (
    <SmartTable
      columns={columns}
      // dataSource={noCalculateList}
      // rowKey={'source_no'}
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
