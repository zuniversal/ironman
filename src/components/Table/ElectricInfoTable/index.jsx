import React from 'react';
import './style.less';

import SmartTable from '@/common/SmartTable';
import { missionsStatusMap } from '@/configs';

const ElectricInfoTable = props => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      className: 'textCenter',
    },
    {
      title: '备注',
      dataIndex: '',
    },
    {
      title: '备注',
      dataIndex: '',
    },
    {
      title: '备注',
      dataIndex: '',
    },
    {
      title: '备注',
      dataIndex: '',
    },
    {
      title: '备注',
      dataIndex: '',
    },
    {
      title: '备注',
      dataIndex: '',
    },
    {
      title: '备注',
      dataIndex: '',
    },
    {
      title: '备注',
      dataIndex: '',
    },
    {
      title: '备注',
      dataIndex: '',
    },
    {
      title: '备注',
      dataIndex: '',
    },
    {
      title: '备注',
      dataIndex: '',
    },
    {
      title: '备注',
      dataIndex: '',
    },
    {
      title: '备注',
      dataIndex: '',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() =>
          props.showFormModal({
            action: 'detail',
            d_id: record.id,
          })
        }
      >
        监控数据展示
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

ElectricInfoTable.defaultProps = {};

export default ElectricInfoTable;
