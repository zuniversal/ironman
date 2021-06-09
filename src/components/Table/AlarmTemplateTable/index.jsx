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
import { notifyTypeConfig } from '@/configs';

const AlarmTemplateTable = props => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    // {
    //   title: '电压过高',
    //   dataIndex: '',
    // },
    // {
    //   title: '电压过低',
    //   dataIndex: '',
    // },
    // {
    //   title: '电流过高',
    //   dataIndex: '',
    // },
    // {
    //   title: '负载过高',
    //   dataIndex: '',
    // },
    {
      title: '通知方式',
      dataIndex: 'notification_type',
      dataIndex: 'notificationType',
      // dataMap: notifyTypeConfig,
    },
    {
      title: '备注',
      dataIndex: 'comments',
    },
  ];

  return <SmartTable columns={columns} {...props}></SmartTable>;
};

export default AlarmTemplateTable;
