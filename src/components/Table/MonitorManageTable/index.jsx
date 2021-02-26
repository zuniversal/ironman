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
      // dataIndex: '',
    },
    {
      title: '户号',
      // dataIndex: '',
    },
    {
      title: '电站',
      // dataIndex: '',
    },
    {
      title: '设备名称',
      // dataIndex: '',
    },
    {
      title: '关联设备',
      // dataIndex: '',
    },
    {
      title: '监测点',
      // dataIndex: '',
    },
    {
      title: '设备类型',
      // dataIndex: '',
    },
    {
      title: 'IEMI号',
      // dataIndex: '',
    },
    {
      title: '状态',
      // dataIndex: '',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() => {
          console.log('Received values of form: ', props);
          props.showQRCode({
            title: `${record.name}`,
            // dataIndex: '',
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
