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

const MissionsManageTable = props => {
  console.log(' MissionsManageTable  ： ', props); //
  const {
    showModal,
    edit,
    remove,
    tdClick,
    startWorkOrder,
    linkContract,
    schedule,
    confirmSchedule,
  } = props; //

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '客户',
      // dataIndex: 'customer',
      dataIndex: ['customer', 'name'],
    },
    {
      title: '任务类型',
      dataIndex: 'type',
    },
    {
      title: '关联合同',
      // dataIndex: 'contract',
      dataIndex: ['contract', 'id'],
    },
    {
      title: '当前状态',
      dataIndex: '',
    },
    {
      title: '发起工单数',
      dataIndex: '',
    },
    {
      title: '创建时间',
      dataIndex: '',
    },
    {
      title: '客户确认',
      dataIndex: 'confirm',
    },
  ];

  const extra = props => (
    <>
      <a onClick={() => startWorkOrder({ action: 'startWorkOrder' })}>
        发起工单
      </a>
      <a onClick={() => schedule({ action: 'schedule' })}>排期</a>
      <a onClick={() => {}}>关闭任务</a>
      {/* <a onClick={() => closeMission({ action: 'closeMission' })}>关闭任务</a> */}
      <a onClick={() => linkContract({ action: 'linkContract' })}>关联合同</a>
      <a disabled className={`disabled `}>
        已排期
      </a>
      <a disabled className={`disabled `}>
        已确认排期
      </a>
      <a disabled className={`disabled `}>
        已关闭
      </a>
    </>
  );

  return (
    <SmartTable
      columns={columns}
      // dataSource={noCalculateList}
      // rowKey={'source_no'}
      extra={extra}
      isQRCode
      noDefault
      {...props}
    ></SmartTable>
  );
};

MissionsManageTable.defaultProps = {
  tdClick: () => {},
};

export default MissionsManageTable;
