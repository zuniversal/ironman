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

const CsHomeStationTable = props => {
  console.log(' CsHomeStationTable  ：', props); //
  const { showModal, edit, remove, tdClick, complete } = props; //

  const columns = [
    {
      title: '巡检ID',
      dataIndex: 'id',
    },
    {
      title: '巡检名称',
      dataIndex: 'id',
    },
    {
      title: '巡检状态',
      dataIndex: 'id',
    },
    {
      title: '巡检人',
      dataIndex: 'id',
    },
    {
      title: '完成时间',
      dataIndex: 'id',
    },
    {
      title: '巡检结果',
      dataIndex: 'id',
    },
    {
      title: '否有缺陷登记',
      dataIndex: 'id',
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
      // dataSource={noCalculateList}
      // rowKey={'source_no'}

      scroll={{ x: 800 }}
      rowLength={3}
      pagination={false}
      extra={extra}
      noDefault
      {...props}
    ></SmartTable>
  );
};

export default CsHomeStationTable;
