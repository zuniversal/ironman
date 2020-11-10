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

const InspectMissionTable = props => {
  const { showModal, edit, remove, tdClick, assignMission, editDate } = props; //

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
      dataMap: missionsStatusMap,
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
      {/* <a onClick={() => tdClick({ action: 'showList' })}>派发</a>
      <a onClick={() => tdClick({ action: 'showList' })}>已领取</a>
      <a onClick={() => tdClick({ action: 'showList' })}>已开始</a> */}
      {/* <a onClick={() => tdClick({ action: 'showList' })}>任务</a> */}
      <a
        onClick={() =>
          props.showFormModal({ action: 'assignMission', d_id: record.id })
        }
      >
        分配
      </a>
      <a
        onClick={() =>
          props.showFormModal({ action: 'editDate', d_id: record.id })
        }
      >
        修改日期
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

InspectMissionTable.defaultProps = {
  tdClick: () => {},
};

export default InspectMissionTable;
