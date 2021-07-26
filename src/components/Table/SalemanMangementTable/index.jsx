import React from 'react';
import SmartTable from '@/common/SmartTable';

const SalemanMangementTable = props => {
  const columns = [
    {
      title: '姓名',
      // dataIndex: '',
      // detailFn: record =>
      //   props.showItemAsync({
      //     action: 'clientDetailAsync',
      //     d_id: record.customer.id,
      //   }),
    },
    {
      title: '所属子公司',
      // dataIndex: '',
    },
    {
      title: '性别',
      // dataIndex: '',
    },
    {
      title: '手机',
      // dataIndex: '',
    },
    {
      title: '角色',
      // dataIndex: '',
    },
    {
      title: '邮箱',
      // dataIndex: '',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a onClick={() => props.xxx}>查看客户</a>
    </>
  );

  return <SmartTable columns={columns} extra={extra} {...props}></SmartTable>;
};

export default SalemanMangementTable;
