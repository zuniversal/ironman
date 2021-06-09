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

const HomeInspectMissionTable = props => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      // title: '名称',
      title: '编码',
      dataIndex: 'name',
      detailFn: record =>
        props.showItemAsync({
          action: 'inspectMissionDetailAsync',
          // action: 'workOrderDetailAsync',
          d_id: record.id,
        }),
    },
    {
      noCutText: true,
      title: '电站',
      dataIndex: ['plan', 'station', 'name'],
      detailFn: record =>
        props.showItemAsync({
          action: 'powerStationDetailAsync',
          d_id: record.plan.station.id,
        }),
    },
    {
      noCutText: true,
      title: '客户名称',
      dataIndex: ['customer', 'name'],
      detailFn: record =>
        props.showItemAsync({
          action: 'clientDetailAsync',
          d_id: record.customer.id,
        }),
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
      // pagination={false}
      // extra={extra}
      noActionCol
      noDefault
      rowSelection={null}
      paginationConfig={{
        size: 'small',
        showSizeChanger: false,
      }}
      {...props}
    ></SmartTable>
  );
};

export default HomeInspectMissionTable;
