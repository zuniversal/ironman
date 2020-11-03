import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //

const VisitManageForm = props => {
  console.log(' VisitManageForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'TextArea',
      itemProps: {
        label: '回访结论',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' VisitManageForm '}>
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

VisitManageForm.defaultProps = {};

export default VisitManageForm;
