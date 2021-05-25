import React from 'react';
import './style.less';
import SmartTable from '@/common/SmartTable';

const PlatformConfigTable = props => {
  const columns = [
    {
      title: '平台名称',
      dataIndex: '',
    },
    {
      title: '平台类型',
      dataIndex: '',
    },
    {
      title: '平台地址',
      dataIndex: '',
      // detailFn: record => props.showItemAsync({
      //     action: 'clientDetailAsync',
      //     d_id: record.id,
      //   }),
    },
  ];

  return <SmartTable columns={columns} {...props}></SmartTable>;
};

export default PlatformConfigTable;
