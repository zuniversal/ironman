import React from 'react';
import SmartTable from '@/common/SmartTable';
import SmartImg from '@/common/SmartImg';

const SignRecordTable = props => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '打卡人',
      dataIndex: ['user', 'nickname'],
      // detailFn: record =>
      //   props.showItemAsync({
      //     action: 'clientDetailAsync',
      //     d_id: record.customer.id,
      //   }),
    },
    {
      title: '客户名称',
      dataIndex: ['customer', 'name'],
      detailFn: record =>
        props.showItemAsync({
          action: 'clientDetailAsync',
          d_id: record.customer.id,
        }),
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '打卡时间',
      dataIndex: 'time',
      day: true,
    },
    {
      title: '附件',
      dataIndex: 'file',
      render: (text, record, index) => {
        return <SmartImg src={text} className={`thumbnail`} />;
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() =>
          props.showFormModal({
            action: 'approveClientClueAsync',
            d_id: record.id,
            name: record.name,
            salesman_id: `${record.salesman_id}`,
          })
        }
      >
        审批
      </a>
    </>
  );

  return (
    <SmartTable
      columns={columns}
      // extra={extra}
      rowSelection={null}
      noActionCol
      {...props}
    ></SmartTable>
  );
};

export default SignRecordTable;
