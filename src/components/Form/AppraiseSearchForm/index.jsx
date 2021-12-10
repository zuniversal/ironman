import React from 'react';

import SmartForm, { SearchForm } from '@/common/SmartForm';

const AppraiseSearchForm = props => {
  const config = [
    {
      formType: 'DatePicker',
      itemProps: {
        label: '日期',
        name: 'handover_time',
      },
    },
    {
      // formType: 'Select',
      noLabel: true,
      itemProps: {
        label: '姓名/手机号',
        name: 'keyword',
      },
      searchSuffix: true,
    },
  ];

  return <SearchForm config={config} noRuleAll {...props}></SearchForm>;
};

AppraiseSearchForm.defaultProps = {};

export default AppraiseSearchForm;
