import React from 'react';
import SmartForm from '@/common/SmartForm';

const checkboxData = [
  { label: '户号1', value: 'yes1', key: 'yes1' },
  { label: '户号2', value: 'yes2', key: 'yes2' },
  { label: '户号3', value: 'yes3', key: 'yes3' },
];

const OrganizeForm = props => {
  const config = [
    {
      itemProps: {
        label: '登录名',
        name: 'username',
      },
    },
    {
      formType: 'Password',
      itemProps: {
        label: '密码',
        name: 'password',
      },
    },
    {
      itemProps: {
        label: '用户名',
        name: 'nickname',
      },
    },
    {
      itemProps: {
        label: '手机号',
        name: 'phone',
      },
    },
    {
      formType: 'Checkbox',
      // checkboxData: checkboxData,
      checkboxData: props.userHouseNoList,
      itemProps: {
        label: '关联户号',
        name: 'customer',
      },
    },
  ];

  return <SmartForm config={config} {...props}></SmartForm>;
};

OrganizeForm.defaultProps = {};

export default OrganizeForm;
