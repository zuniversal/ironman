import React from 'react';

import SmartForm, { SearchForm } from '@/common/SmartForm';

const SystemNotifySearchForm = props => {
  const config = [
    {
      formType: 'RangePicker',
      itemProps: {
        label: '日期',
      },
    },
  ];

  return <SearchForm config={config} noRuleAll {...props}></SearchForm>;
};

SystemNotifySearchForm.defaultProps = {};

export default SystemNotifySearchForm;
