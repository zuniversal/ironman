import React from 'react';
import './style.less';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Radio,
  Space,
  InputNumber,
} from 'antd';

import SmartForm from '@/common/SmartForm'; //

const config = [
  {
    formType: 'Input',
    itemProps: {
      label: '姓名',
      name: 'name',
      key: 'name',
      rules: [
        {
          required: true,
          message: 'Please input your name !',
        },
      ],
    },
    comProps: {
      allowClear: true,
    },
    // fns(e,  ) {
    //   console.log(' fns ： ', e, this,  )

    // }
  },
  {
    formType: 'rowText',
    rowText: '基本信息:',
    itemProps: {
      // label: "基本信息:",
      key: 'rowText',
    },
  },
  {
    formType: 'Input',
    itemProps: {
      label: '角色',
      name: 'role',
      key: 'role',
      rules: [
        {
          required: true,
          message: 'Please input your role !',
        },
      ],
    },
    comProps: {
      allowClear: true,
      disabled: true,
    },
  },
  {
    formType: 'Input',
    itemProps: {
      label: '手机',
      name: 'tel',
      key: 'tel',
      rules: [
        {
          required: true,
          message: 'Please input your tel !',
        },
      ],
    },
    comProps: {
      allowClear: true,
    },
  },
  {
    formType: 'rowText',
    itemProps: {
      // label: "基本信息:",
      key: 'rowText2',
    },
    rowText: '基本信息:',
  },
  {
    formType: 'Input',
    itemProps: {
      label: '邮箱',
      name: 'email',
      key: 'email',
      rules: [
        {
          required: true,
          message: 'Please input your email !',
        },
      ],
    },
    comProps: {
      allowClear: true,
    },
  },
  {
    formType: 'Input',
    itemProps: {
      label: '业务部门',
      name: 'dep',
      key: 'dep',
      rules: [
        {
          required: true,
          message: 'Please input your dep !',
        },
      ],
    },
    comProps: {
      allowClear: true,
      disabled: true,
    },
  },
  {
    formType: 'Password',
    itemProps: {
      label: '密码重置',
      name: 'password',
      key: 'password',
      rules: [
        {
          required: true,
          message: 'Please input your password !',
        },
      ],
    },
    comProps: {
      allowClear: true,
    },
  },
  {
    formType: 'Password',
    itemProps: {
      label: '再次输入密码',
      name: 'password2',
      key: 'password2',
      rules: [
        {
          required: true,
          message: 'Please input your password2 !',
        },
      ],
    },
    comProps: {
      allowClear: true,
    },
  },

  // <Form.Item
  //   name="email"
  //   label="E-mail"
  //   rules={[
  //     {
  //       type: 'email',
  //       message: 'The input is not valid E-mail!',
  //     },
  //     {
  //       required: true,
  //       message: 'Please input your E-mail!',
  //     },
  //   ]}
  // >
  //   <Input />
  // </Form.Item>,

  // {
  //   formType: 'Select',
  //   itemProps: {
  //     label: "Select", name: 'select', key: "select", rules: rules(),
  //   },
  //   comProps: {
  //     allowClear: true,
  //     onChange: onGenderChange,
  //     placeholder: "Select a option and change input text above",
  //   },
  //   selectOptions: selectOptions,

  // },
];

// console.log(' config[0].fns(1111) ： ', config[0].fns(1111),  )//

const test = params => {
  console.log(' test   params, ,   ： ', params, this);
};

const UserCenterForm = () => {
  console.log(' UserCenterForm ： '); //
  return (
    <div>
      <SmartForm
        config={config}
        init={{
          name: 'zyb',
          role: '巡检人员',
          tel: 'zyb',
          email: 'zyb',
          dep: '巡检运维',
          // password
          // password2
          // select
        }}
        test={() => test()}
      ></SmartForm>
    </div>
  );
};

UserCenterForm.defaultProps = {};

export default UserCenterForm;
