import React from 'react';
import { SearchForm } from '@/common/SmartForm';
import { mytaskTabConfig } from '@/configs';

const MyTaskSearchForm = props => {
  const config = [
    {
      itemProps: {
        label: '提交人',
        name: '',
      },
    },
    {
      formType: 'Search',
      selectData: mytaskTabConfig,
      itemProps: {
        label: '类型',
        name: '',
      },
    },
    // {
    //   itemProps: {
    //     label: '进度',
    //     name: '',
    //   },
    // },
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
