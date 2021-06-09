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
import { missionsTypeMap, missionsStatusMap } from '@/configs';
import { tips } from '@/utils';

const BussniessRecordTable = props => {
  const columns = [
    {
      title: '订单ID',
      dataIndex: 'id',
      // detailFn: record =>
      //   props.showItemAsync({
      //     action: 'houseNoDetailAsync',
      //     d_id: record.id,
      //   }),
    },
    {
      title: '类型',
      dataIndex: 'type',
      dataMap: missionsTypeMap,
    },
    {
      title: '处理状态',
      dataIndex: 'status',
      dataMap: missionsStatusMap,
    },
    {
      title: '申请时间',
      dataIndex: 'created_time',
    },
    {
      title: '确认',
      dataIndex: 'confirm',
      render: (text, record, index) => `${text}`,
    },
  ];

  // 根据 type 显示对应的 抢修 、电力施工和电气试验 模态框详情  模态框表单的确认按钮
  // status 值是 completed     confirm = true 表示已经确认过不显示 确认按钮  但是抢修详情 显示 事故处理三行
  const formTypeMap = {
    rush_to_repair: 'detail',
    power_construction: 'powerDetail',
    electrical_testing: 'powerDetail',
  };

  const extra = (text, record, index, props) => {
    const action = formTypeMap[record.type];
    console.log('  action ：', action);
    return (
      <>
        {record.type !== 'demand_declaration' && (
          <a
            onClick={() => {
              // console.log(' props.edit ： ', props, props.edit,   )//
              props.edit({ action: action, d_id: record.id });
            }}
          >
            查看详情
          </a>
        )}
        {/* <a onClick={() => props.edit({ action: 'detail', d_id: record.id, })}>查看详情</a> */}
        {/* <a onClick={() => props.edit({ action: 'powerDetail', d_id: record.id, })}>xx详情</a> */}
      </>
    );
  };

  return (
    <SmartTable
      columns={columns}
      extra={extra}
      noDefault
      {...props}
    ></SmartTable>
  );
};

export default BussniessRecordTable;
