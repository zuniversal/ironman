import React from 'react';
import SmartTable from '@/common/SmartTable';
import { clientClueLevelMap, clientClueStatusMap } from '@/configs';

const ClientClueTable = props => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '客户名称',
      dataIndex: 'name',
      // detailFn: record =>
      //   props.showItemAsync({
      //     action: 'clientDetailAsync',
      //     d_id: record.customer.id,
      //   }),
    },
    {
      title: '客户等级',
      dataIndex: 'level',
      dataMap: clientClueLevelMap,
    },
    {
      title: '户号数',
      dataIndex: 'ele_user_count',
    },
    // {
    //   title: '客户类型',
    //   // dataIndex: '',
    // },
    // {
    //   title: '当前状态',
    //   dataIndex: 'status',
    // },
    {
      title: '客户地址',
      dataIndex: 'address',
    },
    {
      title: '提交人',
      dataIndex: 'salesman_name',
    },
    {
      title: '状态',
      dataIndex: 'status',
      dataMap: clientClueStatusMap,
    },
  ];

  return (
    <SmartTable rowSelection={null} columns={columns} {...props}></SmartTable>
  );
};

export default ClientClueTable;
