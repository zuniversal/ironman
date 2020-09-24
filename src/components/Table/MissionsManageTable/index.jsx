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
  } = props; //

  const columns = [
    {
      title: 'id',
    },
    {
      title: '名称',
    },
    {
      title: '客户',
    },
    {
      title: '任务类型',
    },
    {
      title: '关联合同',
    },
    {
      title: '当前状态',
    },
    {
      title: '发起工单数',
    },
    {
      title: '创建时间',
    },
  ];

  const extra = props => (
    <>
      <a onClick={() => startWorkOrder({ action: 'startWorkOrder' })}>
        发起工单
      </a>
      <a onClick={() => tdClick({ action: 'showList' })}>完成任务</a>
      <a onClick={() => linkContract({ action: 'linkContract' })}>关联合同</a>
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
