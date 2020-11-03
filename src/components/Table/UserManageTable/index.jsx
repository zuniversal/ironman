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

const UserManageTable = props => {
  console.log(' UserManageTable  ： ', props); //
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: 'id',
      dataIndex: 'user_id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '手机',
      dataIndex: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '业务部门',
      // dataIndex: '',
    },
    {
      title: '角色',
      // dataIndex: '',
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

UserManageTable.defaultProps = {
  tdClick: () => {},
};

export default UserManageTable;
