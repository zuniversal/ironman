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
import { HOUSENO } from '@/constants'; //
import { linkUrlFn } from '@/utils'; //

const CsClientReportTable = props => {
  const { tdClick, add, edit, showDetail } = props; //

  const columns = [
    {
      title: '报告名称',
      dataIndex: 'name',
    },
    {
      title: '报告类型',
      dataIndex: 'name',
    },
    {
      title: '报告时间',
      dataIndex: 'name',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a onClick={() => props.showFormModal({ action: 'pdf' })}>下载</a>
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

CsClientReportTable.defaultProps = {
  showModal: () => {},
};

export default CsClientReportTable;
