import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm'; //
import { regoins } from '@/configs'; //
import { formatConfig } from '@/utils'; //

const selectData = [
  {
    label: '部门1',
    value: 'app1',
    children: [
      { label: '子部门1', value: 'msg1' },
      { label: '子部门2', value: 'email1' },
    ],
  },
  {
    label: '部门2',
    value: 'app2',
    children: [
      { label: '子部门1', value: 'msg2' },
      { label: '子部门2', value: 'email2' },
    ],
  },
];

const checkboxData = [
  { label: '户号1', value: 'yes1', key: 'yes1' },
  { label: '户号2', value: 'yes2', key: 'yes2' },
  { label: '户号3', value: 'yes3', key: 'yes3' },
];

const OrganizeForm = props => {
  console.log(' OrganizeForm ： ', props); //
  const { formBtn, ...rest } = props; //

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

  return (
    <div className={' OrganizeForm '}>
      <SmartForm config={config} {...rest}></SmartForm>

      {formBtn}
    </div>
  );
};

OrganizeForm.defaultProps = {};

export default OrganizeForm;
