import React from 'react';
import { SearchForm } from '@/common/SmartForm';

const MyTaskSearchForm = props => {
  const config = [
    {
      // formType: 'Search',
      // selectData: ,
      itemProps: {
        label: '提交人',
        name: '',
      },
    },
    {
      // formType: 'Search',
      // selectData: ,
      itemProps: {
        label: '类型',
        name: '',
      },
    },
    {
      itemProps: {
        label: '进度',
        name: '',
      },
    },
    {
      noLabel: true,
      itemProps: {
        label: '关键字',
        name: 'keyword',
      },
      comProps: {
        className: 'lastFormItem',
      },
      searchSuffix: true,
    },
  ];

  return <SearchForm config={config} {...props}></SearchForm>;
};

export default MyTaskSearchForm;
