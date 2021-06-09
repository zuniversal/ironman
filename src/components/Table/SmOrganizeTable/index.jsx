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

const SmOrganizeTable = props => {
  const columns = [
    {
      title: '部门',
    },
  ];

  return (
    <SmartTable
      columns={columns}
      haveChildren
      // expandable={{
      //   expandedRowRender: record => <p style={{ margin: 0 }}>{record.field0}</p>,
      //   rowExpandable: record => record.name !== 'Not Expandable',
      // }}

      {...props}
    ></SmartTable>
  );
};

export default SmOrganizeTable;
