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

const RoleTable = props => {
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '角色',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'comments',
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

RoleTable.defaultProps = {
  tdClick: () => {},
};

export default RoleTable;
