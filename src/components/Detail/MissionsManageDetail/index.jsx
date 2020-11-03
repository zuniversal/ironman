import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm'; //

const MissionsForm = props => {
  console.log(' MissionsForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      itemProps: {
        label: '客户',
      },
    },
    {
      itemProps: {
        label: '名称',
      },
    },
    {
      itemProps: {
        label: '任务描述',
      },
    },
    {
      itemProps: {
        label: '联系人',
      },
    },
    {
      itemProps: {
        label: '电话',
      },
    },
    {
      itemProps: {
        label: '地址',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' MissionsForm '}>
      <SmartForm
        // flexRow={6}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        {...rest}
      ></SmartForm>

      {formBtn}
    </div>
  );
};

MissionsForm.defaultProps = {};

export default MissionsForm;
