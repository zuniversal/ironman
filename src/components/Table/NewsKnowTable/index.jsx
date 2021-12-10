import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import SmartTable from '@/common/SmartTable';

const NewsKnowTable = props => {
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      detailFn: record =>
        props.showItemAsync({
          action: 'newsKnowDetailAsync',
          d_id: record.id,
          id: record.id,
        }),
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

export default NewsKnowTable;
