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

const AlarmRecordTable = props => {
  console.log(' AlarmRecordTable  ： ', props); //
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: 'id',
    },
    {
      title: '客户',
    },
    {
      title: '监测点',
    },
    {
      title: '告警详情',
    },
    {
      title: '告警模板',
    },
    {
      title: '告警状态',
    },
    {
      title: '开始时间',
    },
    {
      title: '持续时长',
    },
    {
      title: '当前状态',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a onClick={() => tdClick({ action: 'showList' })}>处理</a>
      <a onClick={() => tdClick({ action: 'showList' })}>通知客户</a>
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

AlarmRecordTable.defaultProps = {
  tdClick: () => {},
};

export default AlarmRecordTable;
