import React from 'react';
import SmartTable from '@/common/SmartTable';

const ClientClueTable = props => {
  const columns = [
    {
      title: 'id',
      // dataIndex: 'id',
    },
    {
      title: '客户名称',
      // dataIndex: '',
      // detailFn: record =>
      //   props.showItemAsync({
      //     action: 'clientDetailAsync',
      //     d_id: record.customer.id,
      //   }),
    },
    {
      title: '客户等级',
      // dataIndex: '',
    },
    {
      title: '户号数',
      // dataIndex: '',
    },
    {
      title: '客户类型',
      // dataIndex: '',
    },
    {
      title: '当前状态',
      // dataIndex: '',
    },
    {
      title: '客户地址',
      // dataIndex: '',
    },
    {
      title: '提交人',
      // dataIndex: '',
    },
    {
      title: '状态',
      // dataIndex: '',
      // dataMap: ,
    },
  ];

  return (
    <SmartTable rowSelection={null} columns={columns} {...props}></SmartTable>
  );
};

export default ClientClueTable;
