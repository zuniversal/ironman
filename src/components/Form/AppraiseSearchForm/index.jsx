import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //

const AppraiseSearchForm = props => {
  console.log(' AppraiseSearchForm ： ', props); //
  const { formBtn, ...rest } = props; //

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

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={'fsb AppraiseSearchForm '}>
      <SearchForm
        // flexRow={4}
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

AppraiseSearchForm.defaultProps = {};

export default AppraiseSearchForm;
