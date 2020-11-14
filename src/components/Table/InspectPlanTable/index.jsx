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

const InspectPlanTable = props => {
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    // {
    //   title: '电站',
    //   dataIndex: 'name',
    // },
    // {
    //   title: '客户',
    //   dataIndex: 'customer',
    // },
    // {
    //   title: '剩余',
    //   dataIndex: 'surplus_plan_num',
    // },
    // {
    //   title: '总巡检数量',
    //   dataIndex: 'spect_plan_num',
    // },
    {
      title: '电站',
      dataIndex: 'name',
      render: (text, record, index) => record.addr + '/' + record.addr,
    },
    {
      title: '剩余/总巡检数量',
      dataIndex: 'calcNum',
      render: (text, record, index) =>
        record.surplus_plan_num + '/' + record.spect_plan_num,
    },
  ];

  return <SmartTable columns={columns} noDefault {...props}></SmartTable>;
};

InspectPlanTable.defaultProps = {
  tdClick: () => {},
};

export default InspectPlanTable;
