import React from 'react';
import './style.less';

import SmartForm from '@/common/SmartForm'; //

const AssessmentForm = props => {
  console.log(' AssessmentForm ： ', props); //

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
        name: 'abstract',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' AssessmentForm '}>
      <SmartForm
        // flexRow={6}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        {...props}
      ></SmartForm>

      {/* {formBtn} */}
    </div>
  );
};

AssessmentForm.defaultProps = {};

export default AssessmentForm;
