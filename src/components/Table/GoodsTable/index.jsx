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

const GoodsTable = props => {
  const { showModal, edit, remove, tdClick } = props;

  const columns = [
    {
      title: '物料编号',
      dataIndex: 'code',
    },
    {
      title: '物料名称',
      dataIndex: 'name',
    },
    {
      title: '物料规格',
      dataIndex: 'specification',
    },
    // {
    //   title: '物料单位',
    //   dataIndex: '',
    // },
    {
      title: '单价(元)',
      dataIndex: 'price',
    },
  ];

  return <SmartTable columns={columns} {...props}></SmartTable>;
};

GoodsTable.defaultProps = {
  tdClick: () => {},
};

export default GoodsTable;
