import React from 'react';
import SmartTable from '@/common/SmartTable';
import { arrMapObj } from '@/utils';

const OutlineTable = props => {
  console.log(' OutlineTable ： ', props); //
  const columns = [
    {
      title: '出线侧编号',
      dataIndex: 'id',
    },
    {
      title: '出线侧名称',
      dataIndex: 'name',
    },
    {
      title: '电源编号',
      dataIndex: 'power_number',
      dataMap: arrMapObj(props.outlineSetArr),
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() =>
          props.showFormModal2({
            action: 'editOutlineAsync',
            record,
            d_id: `${record.id}`,
            extraData2: {
              powerNumberList: props.powerNumberList,
            },
          })
        }
      >
        编辑
      </a>
      <a
        onClick={() =>
          props.remove({
            id: `${record.id}`,
            d_id: `${record.id}`,
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

export default OutlineTable;
