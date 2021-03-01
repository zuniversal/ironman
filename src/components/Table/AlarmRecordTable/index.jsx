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
import {
  alarmRecordLevelMap,
  alarmRecordStatusMap,
  alarmRecordTypeMap,
} from '@/configs';

const AlarmRecordTable = props => {
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      noCutText: true,
      width: 200,
      title: '客户',
      dataIndex: 'customer_name',
      detailFn: record =>
        props.showItemAsync({
          action: 'clientDetailAsync',
          d_id: record.customer_id,
        }),
    },
    {
      title: '户号',
      dataIndex: 'number',
      detailFn: record =>
        props.showItemAsync({
          action: 'houseNoDetailAsync',
          d_id: record.electricity_user_id,
        }),
    },
    {
      title: '监控点',
      dataIndex: 'monitor_point_name',
    },
    {
      title: '告警详情',
      title: '告警内容',
      dataIndex: 'name',
    },
    // {
    //   title: '告警模板',
    // },
    {
      title: '告警状态',
      title: '处理状态',
      dataIndex: 'status',
      dataMap: alarmRecordStatusMap,
    },
    {
      title: '告警等级',
      dataIndex: 'level',
      dataMap: alarmRecordLevelMap,
    },
    {
      title: '类型',
      dataIndex: 'type',
      dataMap: alarmRecordTypeMap,
    },
    {
      title: '持续时长',
      dataIndex: 'duration',
      render: (text, record, index) => {
        console.log(' text, record, index,   ： ', text, record, index); //
        return `${text / 60} 分钟`;
      },
    },
    {
      title: '开始时间',
      dataIndex: 'created_time',
      day: 'YYYY-MM-DD HH:mm:ss',
    },
    {
      title: '备注',
      dataIndex: 'comments',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a onClick={() => props.showFormModal({ action: 'handleAlarm', record })}>
        处理
      </a>
      <a
        onClick={() => props.showFormModal({ action: 'notifyClient', record })}
      >
        通知客户
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

AlarmRecordTable.defaultProps = {
  tdClick: () => {},
};

export default AlarmRecordTable;
