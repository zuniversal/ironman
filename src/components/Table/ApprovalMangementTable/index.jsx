import React from 'react';
import SmartTable from '@/common/SmartTable';
import { myTaskTypeMap, mytaskTabMap } from '@/configs';

const ApprovalMangementTable = props => {
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
    // {
    //   title: '进度',
    //   // dataIndex: '',
    // },
    {
      title: '提交人',
      dataIndex: ['submitter', 'name'],
    },
    // {
    //   title: '审批人',
    //   // dataIndex: '',
    // },
    {
      title: '提交时间',
      dataIndex: 'created_time',
      day: true,
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      {/* <a
        onClick={() =>
          props.getItemAsync({
            action: 'detail',
            d_id: record.id,
          })
        }
      >
        查看
      </a> */}
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
    </>
  );

  return (
    <SmartTable
      columns={columns}
      extra={extra}
      noDefault
      rowSelection={null}
      {...props}
    ></SmartTable>
  );
};

export default ApprovalMangementTable;
