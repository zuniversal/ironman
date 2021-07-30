import React from 'react';
import SmartTable from '@/common/SmartTable';

const ApprovalMangementTable = props => {
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
    {
      title: '提交人',
      // dataIndex: '',
    },
    {
      title: '审批人',
      // dataIndex: '',
    },
    {
      title: '提交时间',
      // dataIndex: '',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      {record.status == 1 && (
        <a
          onClick={() =>
            props.showFormModal({ action: 'handleAlarm', d_id: record.id })
          }
        >
          查看
        </a>
      )}
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

export default ApprovalMangementTable;
