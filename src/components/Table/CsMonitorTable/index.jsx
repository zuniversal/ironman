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

const CsMonitorTable = props => {
  console.log(' CsMonitorTable  ： ', props); //
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: 'id',
    },
    {
      title: '服务',
    },
    {
      title: '状态',
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

CsMonitorTable.defaultProps = {
  tdClick: () => {},
};

export default CsMonitorTable;
