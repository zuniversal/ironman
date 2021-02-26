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

const AlarmTemplateTable = props => {
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '名称',
    },
    {
      title: '电压过高',
    },
    {
      title: '电压过低',
    },
    {
      title: '电流过高',
    },
    {
      title: '负载过高',
    },
    {
      title: '通知方式',
    },
  ];

  return <SmartTable columns={columns} {...props}></SmartTable>;
};

AlarmTemplateTable.defaultProps = {
  tdClick: () => {},
};

export default AlarmTemplateTable;
