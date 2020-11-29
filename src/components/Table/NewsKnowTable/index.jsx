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

const NewsKnowTable = props => {
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      // detailFn: record =>
      //   props.showItemAsync({
      //     action: 'newsKnowDetailAsync',
      //     d_id: record.id,
      //   }),
    },
    {
      title: '发布时间',
      dataIndex: 'updated_time',
    },
    {
      title: '发布人',
      dataIndex: 'operator',
    },
  ];

  return <SmartTable columns={columns} {...props}></SmartTable>;
};

NewsKnowTable.defaultProps = {
  tdClick: () => {},
};

export default NewsKnowTable;
