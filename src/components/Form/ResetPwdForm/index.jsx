import React from 'react';
import './style.less';

import SmartForm from '@/common/SmartForm'; //
import WeakDetailImg from '@/components/Widgets/WeakDetailImg'; //
import SmartImg from '@/common/SmartImg';

const ResetPwdForm = props => {
  console.log(' ResetPwdForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      noLabel: true,
      itemProps: {
        label: '新密码',
        name: 'username',
      },
      comProps: {
        className: 'formItem',
      },
    },
    {
      noLabel: true,
      itemProps: {
        label: '确认密码',
        name: 'password',
      },
      comProps: {
        className: 'formItem',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <SmartForm
      config={config}
      formProps={formProps}
      // init={init}
      className={'  '}
      {...props}
    ></SmartForm>
  );
};

ResetPwdForm.defaultProps = {
  init: {},
};

export default ResetPwdForm;
