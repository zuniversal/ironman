import React from 'react';
import './style.less';

import SmartForm from '@/common/SmartForm'; //
import WeakDetailImg from '@/components/Widgets/WeakDetailImg'; //
import SmartImg from '@/common/SmartImg';

const LoginForm = props => {
  console.log(' LoginForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      noLabel: true,
      itemProps: {
        label: '登录名',
        name: 'username',
      },
      comProps: {
        className: 'formItem',
      },
    },
    {
      noLabel: true,
      itemProps: {
        label: '密码',
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

LoginForm.defaultProps = {
  init: {},
};

export default LoginForm;
