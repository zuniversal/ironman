import React from 'react';
import './style.less';

import SmartForm from '@/common/SmartForm'; //
import WeakDetailImg from '@/components/Widgets/WeakDetailImg'; //
import SmartImg from '@/common/SmartImg';

const ForgetPwdForm = props => {
  console.log(' ForgetPwdForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      noLabel: true,
      itemProps: {
        label: '手机号',
        name: 'username',
      },
      comProps: {
        className: 'formItem',
      },
    },
    {
      noLabel: true,
      itemProps: {
        label: '验证码',
        name: 'password',
      },
      comProps: {
        className: 'formItem',
        suffix: (
          <div className="getCode" onClick={props.getCode}>
            获取验证码
          </div>
        ),
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

ForgetPwdForm.defaultProps = {
  init: {},
};

export default ForgetPwdForm;
