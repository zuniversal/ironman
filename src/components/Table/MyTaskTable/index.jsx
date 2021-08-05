import React from 'react';
import SmartTable from '@/common/SmartTable';
import {
  MYTASK_PENDING_APPROVE,
  MYTASK_COMPLETE,
  MYTASK_APPROVING,
} from '@/configs';

const MyTaskTable = props => {
  console.log(' MyTaskTable   props,   ： ', props);
  const columns = [
    {
      title: '公司名称',
      // dataIndex: '',
      // detailFn: record =>
      //   props.showItemAsync({
      //     action: 'clientDetailAsync',
      //     d_id: record.customer.id,
      //   }),
    },
    {
      title: '类型',
      // dataIndex: '',
    },
    {
      title: '进度',
      // dataIndex: '',
    },
    {
      title: '状态',
      // dataIndex: '',
    },
  ];

  const myTaskCol1 = [
    {
      title: '分配人',
      // dataIndex: '',
    },
    {
      title: '截止时间',
      // dataIndex: '',
    },
  ];
  const myTaskCol2 = [
    {
      title: '提交人',
      // dataIndex: '',
    },
    {
      title: '提交时间',
      // dataIndex: '',
    },
  ];

  const myTaskTableMap = {
    [MYTASK_PENDING_APPROVE]: myTaskCol1,
    [MYTASK_COMPLETE]: myTaskCol1,
    [MYTASK_APPROVING]: myTaskCol2,
  };
  columns.push(...myTaskTableMap[props.taskType]);

  const extra = (text, record, index, props) => (
    <>
      <a onClick={() => props.xxx}>查看</a>
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

MyTaskTable.defaultProps = {
  taskType: MYTASK_PENDING_APPROVE,
};

export default MyTaskTable;
