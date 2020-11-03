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

const CsOrganizeTable = props => {
  console.log(' CsOrganizeTable  ： ', props); //
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: '账号(登录名)',
      dataIndex: 'custom_id',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '关联账户',
      dataIndex: 'customer',
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

CsOrganizeTable.defaultProps = {
  tdClick: () => {},
};

export default CsOrganizeTable;
