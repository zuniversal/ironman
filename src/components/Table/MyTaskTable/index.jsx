import React from 'react';
import SmartTable from '@/common/SmartTable';
import {
  MYTASK_PENDING_APPROVE,
  MYTASK_COMPLETE,
  MYTASK_APPROVING,
  myTaskTypeMap,
  mytaskTabMap,
} from '@/configs';

const MyTaskTable = props => {
  console.log(' MyTaskTable   props,   ： ', props);
  const columns = [
    {
      title: '公司名称',
      dataIndex: ['customer', 'name'],
      detailFn: record =>
        props.showItemAsync({
          action: 'clientDetailAsync',
          d_id: record.customer.customer_id,
        }),
    },
    {
      title: '类型',
      dataIndex: 'type',
      dataMap: myTaskTypeMap,
    },
    // {
    //   title: '进度',
    //   // dataIndex: '',
    // },
    {
      title: '状态',
      dataIndex: 'status',
      dataMap: mytaskTabMap,
    },
  ];

  const myTaskCol1 = [
    {
      title: '分配人',
      title: '提交人',
      dataIndex: ['submitter', 'name'],
    },
    {
      title: '截止时间',
      dataIndex: 'finish_time',
      day: true,
    },
  ];
  const myTaskCol2 = [
    {
      title: '提交人',
      dataIndex: ['submitter', 'name'],
    },
    {
      title: '提交时间',
      dataIndex: 'created_time',
      day: true,
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
      <a
        onClick={() =>
          props.getItemAsync({
            action: 'getPlanContract',
            d_id: record.id,
          })
        }
      >
        查看
      </a>
      <a
        onClick={() => {
          props.showFormModal({
            action: 'approveTaskAsync',
            taskInfo: {
              d_id: record.id,
            },
          });
        }}
      >
        审批
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

MyTaskTable.defaultProps = {
  taskType: MYTASK_PENDING_APPROVE,
};

export default MyTaskTable;
