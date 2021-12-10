import React from 'react';

import SmartForm from '@/common/SmartForm';
import WeakDetailImg from '@/components/Widgets/WeakDetailImg';
import SmartImg from '@/common/SmartImg';

const ResetPwdForm = props => {
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

  return <SmartForm config={config} {...props}></SmartForm>;
};

ResetPwdForm.defaultProps = {
  init: {},
};

export default ResetPwdForm;
