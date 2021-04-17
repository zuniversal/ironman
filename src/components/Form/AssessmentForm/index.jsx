import React from 'react';
import './style.less';

import SmartForm from '@/common/SmartForm';

const AssessmentForm = props => {
  console.log(' AssessmentForm ： ', props);

  const config = [
    {
      formType: 'Select',
      itemProps: {
        label: '考核类型',
        name: 'title',
      },
    },
    {
      itemProps: {
        label: '指标名称',
        name: 'abstract',
      },
    },
    {
      itemProps: {
        label: '系数',
        name: 'abstract2',
      },
    },
  ];

  return (
    <div className={' AssessmentForm '}>
      <SmartForm config={config} {...props}></SmartForm>

      {/* {formBtn} */}
    </div>
  );
};

AssessmentForm.defaultProps = {};

export default AssessmentForm;
