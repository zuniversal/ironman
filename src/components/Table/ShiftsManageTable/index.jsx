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

import { onDutyTypeMap } from '@/configs'; //
import SmartTable from '@/common/SmartTable'; //
import { Link } from 'umi'; //

const ShiftsManageTable = props => {
  console.log(' ShiftsManageTable  ： ', props); //
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: '班组名称',
      dataIndex: 'name',
      d_item: 'id',
    },
    {
      title: '组长',
      dataIndex: 'team_headman',
    },
    {
      title: '组员',
      // dataIndex: ['member', ''],
      dataIndex: 'member',
    },
    {
      title: '班组类型',
      dataIndex: 'type',
      dataMap: onDutyTypeMap,
    },
    {
      title: '车辆牌照',
      dataIndex: 'car_number',
    },
    {
      title: 'leader',
      dataIndex: 'leader',
    },
  ];

  const extra = (text, record, index, props) => {
    // console.log(' text, record, index, props ： ', text, record, index, props,  )//
    return (
      <>
        {/* <a onClick={() => {
          console.log(' propsprops ： ', props,  )// 
          props.showDetail({
            action: 'detail',
            d_id: record[props.rowKey],
            // [d_item]: record[d_item],
            // record,
          })
        }}>查看排班</a> */}
        {/* <Link to={`/om/shiftsArrange?team=${record.id}&schedule_date=${'2020-10'}`} className={``}>
          查看排班
        </Link> */}
        <a onClick={() => props.goPage(record)}>查看排班</a>
      </>
    );
  };

  return (
    <SmartTable
      columns={columns}
      // dataSource={noCalculateList}
      // rowKey={'source_no'}
      extra={extra}
      // noDefault
      {...props}
    ></SmartTable>
  );
};

ShiftsManageTable.defaultProps = {
  tdClick: () => {},
};

export default ShiftsManageTable;
