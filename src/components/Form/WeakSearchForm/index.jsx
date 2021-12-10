import React from 'react';

import SmartForm, { SearchForm } from '@/common/SmartForm';
import { weakStatusConfig } from '@/configs';

const WeakSearchForm = props => {
  const config = [
    {
      formType: 'Search',
      selectData: weakStatusConfig,
      itemProps: {
        label: '处理状态',
        name: 'status',
      },
    },
    // {
    //   formType: 'Select',
    //   itemProps: {
    //     label: '审批状态',
    //   },
    // },
    // {
    //   formType: 'Divider',
    //   itemProps: {
    //     label: '',
    //   },
    //
    // },

    {
      noLabel: true,
      itemProps: {
        label: '名称',
        name: 'name',
      },
      comProps: {
        className: 'lastFormItem',
      },
      searchSuffix: true,
    },
  ];

  return <SearchForm config={config} {...props}></SearchForm>;
};

WeakSearchForm.defaultProps = {};

export default WeakSearchForm;
