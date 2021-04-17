import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm';

const VisitManageForm = props => {
  console.log(' VisitManageForm ： ', props);
  const { formBtn, ...rest } = props;

  const config = [
    {
      formType: 'TextArea',
      itemProps: {
        label: '回访结论',
      },
      comProps: {
        className: 'conclusionItem',
      },
    },
  ];

  return (
    <div className={' visitManageForm '}>
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

VisitManageForm.defaultProps = {};

export default VisitManageForm;
