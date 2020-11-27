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

const KnowledgeCateTable = props => {
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: '知识库名称',
      dataIndex: 'name',
    },
    {
      title: '推荐到首页',
      dataIndex: 'is_hot',
    },
    {
      title: '创建时间',
      dataIndex: 'updated_time',
    },
    {
      title: '创建人',
      dataIndex: 'operator',
    },
  ];

  return <SmartTable columns={columns} {...props}></SmartTable>;
};

KnowledgeCateTable.defaultProps = {
  tdClick: () => {},
};

export default KnowledgeCateTable;
