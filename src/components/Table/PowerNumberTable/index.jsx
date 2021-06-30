import React from 'react';
import SmartTable from '@/common/SmartTable';
import { voltageLevelMap } from '@/configs';

const PowerNumberTable = props => {
  const columns = [
    {
      title: '电源编号',
      dataIndex: 'power_number',
    },
    {
      title: '电表号',
      dataIndex: 'meter_number',
    },
    {
      title: '进线名称',
      dataIndex: 'incoming_line_name',
    },
    {
      title: '倍率',
      dataIndex: 'magnification',
    },
    {
      title: '装接容量',
      dataIndex: 'transformer_capacity',
    },
    {
      title: '实际容量',
      dataIndex: 'real_capacity',
    },
    {
      title: '电源等级',
      dataIndex: 'voltage_level',
      dataMap: voltageLevelMap,
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() =>
          props.showFormModal2({
            action: 'editPowerNumberAsync',
            record,
          })
        }
      >
        编辑
      </a>
      <a
        onClick={() =>
          props.remove({
            id: record.id,
          })
        }
      >
        删除
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

export default PowerNumberTable;
