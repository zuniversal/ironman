import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm'; //

const AppraiseForm = props => {
  console.log(' AppraiseForm ： ', props); //

  const config = [
    {
      formType: 'rowText',
      itemProps: {
        label: '业务技能',
      },
    },
    {
      itemProps: {
        label: '巡检工作(0.3)',
        // name: '',
      },
    },
    {
      itemProps: {
        label: '站容站貌(0.2)',
        // name: '',
      },
    },
    {
      itemProps: {
        label: '交办任务(0.3)',
        // name: '',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '工作态度',
      },
    },
    {
      itemProps: {
        label: '执行力(0.05)',
        // name: '',
      },
    },
    {
      itemProps: {
        label: '沟通协作(0.05)',
        // name: '',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '劳动纪律',
      },
    },
    {
      itemProps: {
        label: '工作纪律与办公环境(0.1) ',
        // name: '',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' AppraiseForm '}>
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

AppraiseForm.defaultProps = {};

export default AppraiseForm;
