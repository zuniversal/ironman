import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //

const AlarmNotifySearchForm = props => {
  console.log(' AlarmNotifySearchForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'DatePicker',
      itemProps: {
        label: '日期',
      },
    },
  ];

  return (
    <div className={' AlarmNotifySearchForm '}>
      <SearchForm
        config={config}
        noRuleAll
        // {...rest}
        {...props}
      ></SearchForm>

      {/* {formBtn} */}
    </div>
  );
};

AlarmNotifySearchForm.defaultProps = {};

export default AlarmNotifySearchForm;
