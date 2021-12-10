import React from 'react';
import SmartForm, { SearchForm } from '@/common/SmartForm';

const IotAccountSearchForm = props => {
  const config = [
    {
      formType: 'MonthPicker',
      itemProps: {
        label: '到期时间',
        name: 'end_time',
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

export default IotAccountSearchForm;
