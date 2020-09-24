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
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Radio,
  Space,
  InputNumber,
} from 'antd';

import SmartTable from '@/common/SmartTable'; //

const InspectPlanTable = props => {
  console.log(' InspectPlanTable  ： ', props); //
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: '电站',
      dataIndex: 'name',
    },
    {
      title: '客户',
      dataIndex: 'customer',
    },
    {
      title: '剩余',
      dataIndex: 'surplus_plan_num',
    },
    {
      title: '总巡检数量',
      dataIndex: 'spect_plan_num',
    },
  ];

  return (
    <SmartTable
      columns={columns}
      // dataSource={noCalculateList}
      // rowKey={'source_no'}
      noDefault
      {...props}
    ></SmartTable>
  );
};

InspectPlanTable.defaultProps = {
  tdClick: () => {},
};

export default InspectPlanTable;
