import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm';

const AppraiseSearchForm = props => {
  console.log(' AppraiseSearchForm ： ', props);
  const { formBtn, ...rest } = props;

  const config = [
    {
      formType: 'DatePicker',
      itemProps: {
        label: '日期',
        name: 'handover_time',
      },
    },
    {
      // formType: 'Select',
      noLabel: true,
      itemProps: {
        label: '姓名/手机号',
        name: 'keyword',
      },
      searchSuffix: true,
    },
  ];

  return (
    <div className={'fsb AppraiseSearchForm '}>
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

AppraiseSearchForm.defaultProps = {};

export default AppraiseSearchForm;
