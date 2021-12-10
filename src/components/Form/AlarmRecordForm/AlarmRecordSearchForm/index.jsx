import React from 'react';

import SmartForm, { SearchForm } from '@/common/SmartForm';
import { alarmRecordTypeConfig } from '@/configs';

const AlarmRecordSearchForm = props => {
  console.log(' AlarmRecordSearchForm ： ', props);

  const config = [
    {
      formType: 'Search',
      selectData: alarmRecordTypeConfig,
      itemProps: {
        label: '告警类型',
        name: 'type',
      },
    },
    {
      noLabel: true,
      itemProps: {
        label: '关键字',
        name: 'keyword',
      },
    },
  ];

  return (
    <div className={' alarmRecordSearchForm '}>
      <SearchForm config={config} {...props}></SearchForm>
    </div>
  );
};

export default AlarmRecordSearchForm;
