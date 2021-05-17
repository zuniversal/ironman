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
import SearchForm from '@/common/SearchForm';

const RoleTable = props => {
  const { showModal, edit, remove, tdClick } = props;

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '角色',
      // title: <div className={`dfc`}>
      //   <div className={`m-b-5`} >角色</div>
      //   <SearchForm></SearchForm>
      // </div>,
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'comments',
    },
  ];

  return <SmartTable columns={columns} {...props}></SmartTable>;
};

RoleTable.defaultProps = {
  tdClick: () => {},
};

export default RoleTable;
