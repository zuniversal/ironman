import React from 'react';
import SmartForm from '@/common/SmartForm';
import WeakDetailImg from '@/components/Widgets/WeakDetailImg';
import SmartImg from '@/common/SmartImg';

const LoginForm = props => {
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
      formType: 'Password',
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

  return <SmartForm config={config} {...props}></SmartForm>;
};

LoginForm.defaultProps = {
  init: {},
};

export default LoginForm;
