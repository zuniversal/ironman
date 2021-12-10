import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import SmartTable from '@/common/SmartTable';

const CsOrganizeTable = props => {
  const columns = [
    {
      title: '账号(登录名)',
      dataIndex: 'username',
    },
    {
      title: '用户名',
      dataIndex: 'nickname',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '关联账户',
      dataIndex: 'customers',
    },
  ];

  return (
    <SmartTable columns={columns} {...props} rowKey={'user_id'}></SmartTable>
  );
};

export default CsOrganizeTable;
