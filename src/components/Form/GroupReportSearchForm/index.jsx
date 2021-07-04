import React from 'react';
import { SearchForm } from '@/common/SmartForm';

const GroupReportSearchForm = props => {
  console.log(' GroupReportSearchForm ： ', props);

  const config = [
    {
      formType: 'MonthPicker',
      itemProps: {
        label: '选择月份',
        name: 'year_month',
      },
    },
  ];

  return <SearchForm config={config} {...props}></SearchForm>;
};

export default GroupReportSearchForm;
