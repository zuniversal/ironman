import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //

const SystemNotifySearchForm = props => {
  console.log(' SystemNotifySearchForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'RangePicker',
      itemProps: {
        label: '日期',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' SystemNotifySearchForm '}>
      <SearchForm
        // flexRow={6}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        noRuleAll
        // {...rest}
        {...props}
      ></SearchForm>

      {/* {formBtn} */}
    </div>
  );
};

SystemNotifySearchForm.defaultProps = {};

export default SystemNotifySearchForm;
