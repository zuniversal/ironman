import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
  use,
} from 'react';
import './style.less';

import SmartTable from '@/common/SmartTable'; //
import { HOUSENO } from '@/constants'; //
import { linkUrlFn } from '@/utils'; //

const ClientReportTable = props => {
  const { tdClick, add, edit, showDetail } = props; //

  const columns = [
    {
      title: '客户名称',
      dataIndex: 'name',
    },
    {
      title: '户号',
      dataIndex: 'electricy_user',
    },
    {
      title: '客户代表',
      dataIndex: 'service_staff',
    },
    {
      title: '巡检组长',
      dataIndex: 'team_headman',
    },
    {
      title: '电源编号',
      dataIndex: 'power_number',
    },
    {
      title: '电压等级',
      dataIndex: 'voltage_level',
    },
    {
      title: '加急',
      dataIndex: '',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a onClick={() => showDetail({ action: 'detail' })}>查看加急账单</a>
      <a onClick={() => add({ action: 'add' })}>录入</a>
      <a onClick={() => edit({ action: 'edit' })}>修改</a>
      <a onClick={() => props.showFormModal({ action: 'pdf' })}>打印</a>
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

ClientReportTable.defaultProps = {
  showModal: () => {},
};

export default ClientReportTable;
