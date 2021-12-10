import React from 'react';
import SmartTable from '@/common/SmartTable';
import { systemNotifyMap, systemNotifyColorMap } from '@/configs';

const SystemNotifyTable = props => {
  const columns = [
    // {
    //   noCutText: true,
    //   title: '通知',
    //   dataIndex: 'verb',
    // },
    {
      title: '通知',
      dataIndex: 'title',
    },
    {
      title: '内容',
      dataIndex: 'content',
    },
    {
      title: '客户经理',
      dataIndex: 'last_service_staff_name',
    },
    {
      title: '发送人',
      dataIndex: 'sender_name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      dataMap: systemNotifyMap,
      tagMap: systemNotifyColorMap,
    },
    {
      title: '通知时间',
      dataIndex: 'created_time',
      day: 'YYYY-MM-DD HH:mm:ss',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() =>
          props.edit({
            action: 'detail',
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

export default SystemNotifyTable;
