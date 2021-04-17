import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm';

const AlarmNotifyForm = props => {
  console.log(' AlarmNotifyForm ： ', props);
  const { formBtn, ...rest } = props;

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

  return (
    <div className={' AlarmNotifyForm '}>
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

AlarmNotifyForm.defaultProps = {};

export default AlarmNotifyForm;
