import React from 'react';
import SmartForm from '@/common/SmartForm';

export const UserManagePasswordForm = props => {
  const config = [
    {
      itemProps: {
        label: '密码',
        name: 'password',
      },
    },
    {
      itemProps: {
        label: '再次确认密码',
        name: 'rePassword',
      },
    },
  ];

  return <SmartForm config={config} {...props}></SmartForm>;
};
