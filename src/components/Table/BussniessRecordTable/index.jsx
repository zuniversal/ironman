import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './style.less';

import SmartTable from '@/common/SmartTable'; //

const MsgTable = props => {
  console.log(' MsgTable  ： ', props); //
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },

    {
      title: '消息',
      dataIndex: 'content',
    },

    {
      title: '通知人员',
      dataIndex: '',
    },

    {
      title: '通知方法',
      dataIndex: '',
    },

    {
      title: '创建人',
      dataIndex: 'create_by',
    },

    {
      title: '创建时间',
      dataIndex: 'created_time',
    },
  ];

  return (
    <SmartTable
      columns={columns}
      // dataSource={noCalculateList}
      // rowKey={'source_no'}

      {...props}
    ></SmartTable>
  );
};

MsgTable.defaultProps = {
  tdClick: () => {},
};

export default MsgTable;
