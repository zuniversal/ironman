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

const InspectRecordTable = props => {
  console.log(' InspectRecordTable  ： ', props); //
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
      d_item: 'id',
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
    },

    {
      title: '领取人',
      dataIndex: ['team', 'team_headman'],
    },

    {
      title: '执行时间',
      dataIndex: 'work_date',
    },
    {
      title: '领取时间',
      dataIndex: 'assign_date',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a onClick={() => showDetail({ action: 'detail', d_id: record.id })}>
        巡检报告
      </a>
      <a onClick={() => props.showFormModal({ action: 'inspectReport' })}>
        导出巡检报告
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
