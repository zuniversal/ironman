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
import { Tabs } from 'antd';

import SmartTable from '@/common/SmartTable'; //
import { missionsStatusMap } from '@/configs';

const CsHomeStationTable = props => {
  const { showModal, edit, remove, tdClick, complete } = props; //

  const columns = [
    {
      title: '巡检ID',
      dataIndex: 'id',
    },
    {
      title: '巡检名称',
      dataIndex: 'name',
    },
    {
      title: '巡检状态',
      dataIndex: 'status',
      dataMap: missionsStatusMap,
    },
    {
      title: '巡检人',
      dataIndex: ['team', 'team_headman'],
    },
    {
      title: '完成时间',
      dataIndex: 'work_date',
    },
    {
      title: '巡检结果',
      dataIndex: 'confirm',
    },
    {
      title: '是否有缺陷登记',
      dataIndex: 'defect',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a onClick={() => props.showFormModal({ action: 'weakDetail' })}>
        查看缺陷
      </a>
    </>
  );

  return (
    <SmartTable
      columns={columns}
      scroll={{ x: 800 }}
      // rowLength={3}
      pagination={false}
      // extra={extra}
      noActionCol
      noDefault
      {...props}
    ></SmartTable>
  );
};

export default CsHomeStationTable;
