import React from 'react';

import SmartForm from '@/common/SmartForm';

const AssessmentForm = props => {
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

  return <SmartForm config={config} {...props}></SmartForm>;
};

AssessmentForm.defaultProps = {};

export default AssessmentForm;
