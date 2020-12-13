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

const MonitorManageTable = props => {
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: '所属客户',
    },
    {
      title: '户号',
    },
    {
      title: '电站',
    },
    {
      title: '设备名称',
    },
    {
      title: '关联设备',
    },
    {
      title: '监测点',
    },
    {
      title: '设备类型',
    },
    {
      title: 'IEMI号',
    },
    {
      title: '状态',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() => {
          console.log('Received values of form: ', props);
          props.showQRCode({
            title: `${record.name}`,
            record,
            d_id: record.id,
          });
        }}
      >
        生成二维码
      </a>
    </>
  );

  return (
    <SmartTable
      columns={columns}
      extra={extra}
      isQRCode
      {...props}
    ></SmartTable>
  );
};

MonitorManageTable.defaultProps = {
  tdClick: () => {},
};

export default MonitorManageTable;
