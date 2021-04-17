import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm';
import { weakStatusConfig } from '@/configs';

const AlarmRecordSearchForm = props => {
  console.log(' AlarmRecordSearchForm ： ', props);
  const { formBtn, ...rest } = props;

  const config = [
    {
      formType: 'Search',
      selectData: weakStatusConfig,
      itemProps: {
        label: '告警类型',
        name: '',
      },
    },
    {
      formType: 'Search',
      selectData: weakStatusConfig,
      itemProps: {
        label: '告警状态',
        name: '',
      },
    },
    {
      noLabel: true,
      itemProps: {
        label: '告警关键字',
        name: '',
      },
    },
  ];

  return (
    <div className={' alarmRecordSearchForm '}>
      <SearchForm
        config={config}
        // {...rest}
        {...props}
      ></SearchForm>

      {/* {formBtn} */}
    </div>
  );
};

AlarmRecordSearchForm.defaultProps = {};

export default AlarmRecordSearchForm;
