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

const HomeInspectMissionTable = props => {
  const { showModal, edit, remove, tdClick, complete } = props; //

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      // title: '名称',
      title: '编码',
      dataIndex: 'name',
      // detailFn: record =>
      //   props.showItemAsync({
      //     action: 'workOrderDetailAsync',
      //     d_id: record.id,
      //   }),
    },
    {
      title: '电站',
      dataIndex: ['plan', 'station', 'name'],
    },
    {
      title: '客户名称',
      dataIndex: ['customer', 'name'],
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      dataMap: missionsStatusMap,
    },
    {
      title: '领取人',
      dataIndex: ['team', 'team_headman'],
    },
    {
      title: '领取时间',
      dataIndex: 'created_time',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a onClick={() => props.showFormModal({ action: 'complete' })}>完成</a>
      <a onClick={() => props.showFormModal({ action: 'remove' })}>删除</a>
    </>
  );

  return (
    <SmartTable
      columns={columns}
      // rowLength={3}
      pagination={false}
      // extra={extra}
      noActionCol
      noDefault
      {...props}
    ></SmartTable>
  );
};

HomeInspectMissionTable.defaultProps = {
  tdClick: () => {},
};

export default HomeInspectMissionTable;
