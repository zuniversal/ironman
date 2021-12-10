import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm';

const VisitManageForm = props => {
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
      <SearchForm config={config} noRuleAll {...props}></SearchForm>
    </div>
  );
};

VisitManageForm.defaultProps = {};

export default VisitManageForm;
