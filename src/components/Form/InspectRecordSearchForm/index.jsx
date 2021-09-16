import React from 'react';
import SmartForm, { SearchForm } from '@/common/SmartForm';

const InspectRecordSearchForm = props => {
  const config = [
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
    {
      formType: 'MonthPicker',
      itemProps: {
        label: '日期',
        name: 'year_month',
      },
    },
  ];

  return (
    <SearchForm
      config={config}
      noRuleAll
      {...props}
    ></SearchForm>
  );
};

export default InspectRecordSearchForm;
