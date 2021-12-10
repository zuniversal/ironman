import React from 'react';

import SmartForm, { SearchForm } from '@/common/SmartForm';

const BussniessRecordSearchForm = props => {
  const config = [
    {
      noLabel: true,
      itemProps: {
        label: 'id或关键字',
        // label: '任务/客户名称',
        name: 'keyword',
      },
      searchSuffix: true,
    },
    {
      formType: 'RangePicker',
      itemProps: {
        label: '日期',
        name: 'date',
      },
    },
  ];

  return <SearchForm config={config} noRuleAll {...props}></SearchForm>;
};

BussniessRecordSearchForm.defaultProps = {};

export default BussniessRecordSearchForm;
