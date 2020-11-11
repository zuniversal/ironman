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

const OrganizeTable = props => {
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: '部门',
      dataIndex: 'name',
    },
  ];

  return (
    <SmartTable
      columns={columns}
      // dataSource={noCalculateList}
      // rowKey={'source_no'}

      childrenColumnName="childrens"
      haveChildren
      // expandable={{
      //   expandedRowRender: record => <p style={{ margin: 0 }}>{record.field0}</p>,
      //   rowExpandable: record => record.name !== 'Not Expandable',
      // }}

      {...props}
    ></SmartTable>
  );
};

OrganizeTable.defaultProps = {
  tdClick: () => {},
};

export default OrganizeTable;
