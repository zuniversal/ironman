import React from 'react';
import SmartTable from '@/common/SmartTable';

const ClientInfoNotifyTable = props => {
  const columns = [
    {
      title: '序号',
      // dataIndex: '',
    },
    {
      title: '模板名称',
      // dataIndex: '',
    },
    {
      title: '通知事件',
      // dataIndex: '',
    },
    {
      title: '通知方式',
      // dataIndex: '',
    },
    {
      title: '通知人群',
      // dataIndex: '',
    },
  ];

  return <SmartTable columns={columns} {...props}></SmartTable>;
};

export default ClientInfoNotifyTable;
