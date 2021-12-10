import React from 'react';

import SmartForm, { SearchForm } from '@/common/SmartForm';

const AlarmNotifyForm = props => {
  const config = [
    {
      // formType: 'Select',
      itemProps: {
        label: '',
        name: 'keyword',
      },
      comProps: {
        className: 'lastFormItem',
      },
      searchSuffix: true,
    },
  ];

  return <SearchForm config={config} noRuleAll {...props}></SearchForm>;
};

AlarmNotifyForm.defaultProps = {};

export default AlarmNotifyForm;
