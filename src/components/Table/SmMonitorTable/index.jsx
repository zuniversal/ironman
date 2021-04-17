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

const SmMonitorTable = props => {
  const { showModal, edit, remove, tdClick } = props;

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

  return <SmartTable columns={columns} {...props}></SmartTable>;
};

SmMonitorTable.defaultProps = {
  tdClick: () => {},
};

export default SmMonitorTable;
