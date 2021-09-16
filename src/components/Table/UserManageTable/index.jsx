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

import SmartTable from '@/common/SmartTable';

const UserManageTable = props => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      className: 'textCenter',
    },
    {
      title: '姓名',
      dataIndex: 'nickname',
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
      title: '职位',
      dataIndex: 'tag',
    },
    {
      title: '业务部门',
      dataIndex: 'organization',
    },
    {
      title: '角色',
      dataIndex: 'role',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() =>
          props.showFormModal({ action: 'changePasswordAsync', record, })
        }
      >
        修改密码
      </a>
    </>
  );

  return (
    <SmartTable
      columns={columns}
      extra={extra}
      {...props}
    ></SmartTable>
  );
};

export default UserManageTable;
