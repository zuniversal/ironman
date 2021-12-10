import React from 'react';

import SmartForm, { SearchForm } from '@/common/SmartForm';

const OperateRecordSearchForm = props => {
  const config = [
    {
      itemProps: {
        label: '模块',
      },
    },

    {
      noLabel: true,
      itemProps: {
        label: '内容关键字',
        name: 'value',
      },
      comProps: {
        className: 'lastFormItem',
      },
      searchSuffix: true,
    },
  ];

  return <SearchForm config={config} {...props}></SearchForm>;
};

OperateRecordSearchForm.defaultProps = {};

export default OperateRecordSearchForm;
