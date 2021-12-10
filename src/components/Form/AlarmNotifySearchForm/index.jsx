import React from 'react';

import SmartForm, { SearchForm } from '@/common/SmartForm';

const AlarmNotifySearchForm = props => {
  const config = [
    {
      formType: 'DatePicker',
      itemProps: {
        label: '日期',
      },
    },
  ];

  return <SearchForm config={config} noRuleAll {...props}></SearchForm>;
};

AlarmNotifySearchForm.defaultProps = {};

export default AlarmNotifySearchForm;
