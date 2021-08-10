import React from 'react';
import SmartTable from '@/common/SmartTable';

const SalemanMangementClientTable = props => {
  const columns = [
    {
      title: '时间',
      // dataIndex: '',
    },
    {
      title: '描述',
      // dataIndex: '',
    },
    {
      title: '跟进计划',
      // dataIndex: '',
    },
  ];

  return (
    <SmartTable
      columns={columns}
      noActionCol
      rowSelection={null}
      {...props}
    ></SmartTable>
  );
};

export default SalemanMangementClientTable;
