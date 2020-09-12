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
import { regoins } from '@/configs'; //

export const config = [
  {
    formType: 'Select',
    itemProps: {
      label: '省',
      name: 'province',
      key: 'province',
    },
    comProps: {
      className: 'w-200',  
    },
    // customLabel: '自定义customLabel',
  },
  {
    formType: 'Select',
    itemProps: {
      label: '市',
      name: 'city',
      key: 'city',
    },
    comProps: {
      className: 'w-200',  
    },
  },
  {
    formType: 'Select',
    itemProps: {
      label: '县',
      name: 'site',
      key: 'site',
    },
    comProps: {
      className: 'w-200',  
    },
  },

  // <Form.Item
  //   name="email"
  //   label="E-mail"
  //   key={'email'}
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

const init = {
  name: 'zyb',
  role: '巡检人员',
  tel: 'zyb',
  email: 'zyb',
  dep: '巡检运维',
  // password
  // password2
  // select
};

const ProvinceForm = props => {
  console.log(' ProvinceForm ： ', props); //
  const {formBtn, ...rest } = props// 
  const formProps = {
    // layout: 'vertical',
    layout: 'inline',
  };

  return (
    <div className={' provinceForm '}>
      <SmartForm
        // flexRow={4}
        // flexRow={8}
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

ProvinceForm.defaultProps = {};

export default ProvinceForm;
