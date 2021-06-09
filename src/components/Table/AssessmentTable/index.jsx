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

const AssessmentTable = props => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '考核类型',
      // dataIndex: '',
    },
    {
      title: '考核指标',
      // dataIndex: '',
    },
    {
      title: '系数',
      // dataIndex: '',
    },
  ];

  return <SmartTable columns={columns} {...props}></SmartTable>;
};

export default AssessmentTable;
