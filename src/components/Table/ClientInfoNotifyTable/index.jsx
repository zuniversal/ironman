import React from 'react';
import SmartTable from '@/common/SmartTable';
import { crmNotifyTypeMap, boolMap } from '@/configs';

const ClientInfoNotifyTable = props => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '发送人',
      dataIndex: 'sender',
    },
    {
      title: '发送时间',
      dataIndex: 'created_time',
      day: true,
    },
    {
      title: '跟进截止时间',
      dataIndex: 'end_time',
      day: true,
    },
    {
      title: '消息内容',
      dataIndex: 'content',
    },
    {
      title: '消息类型',
      dataIndex: 'type',
      dataMap: crmNotifyTypeMap,
    },
    {
      title: '是否已读',
      dataIndex: 'is_read',
      dataMap: boolMap,
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() =>
          props.showDetail({ action: 'detail', d_id: record[props.rowKey] })
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
      rowSelection={null}
      noDefault
      {...props}
    ></SmartTable>
  );
};

export default ClientInfoNotifyTable;
