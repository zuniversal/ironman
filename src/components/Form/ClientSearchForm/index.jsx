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
  Divider,
} from 'antd';

import SmartForm from '@/common/SmartForm'; //
import SearchForm from '@/common/SearchForm'; //
import ProvinceForm from '@/components/Form/ProvinceForm'; //
import { regoins } from '@/configs'; //

export const config = [
  {
    formType: 'Select',
    itemProps: {
      label: '省',
      name: 'province',
      key: 'province',
    },
    comProps: {},
    // customLabel: '自定义customLabel',
  },
  {
    formType: 'Select',
    itemProps: {
      label: '市',
      name: 'city',
      key: 'city',
    },
    comProps: {},
  },
  {
    formType: 'Select',
    itemProps: {
      label: '县',
      name: 'site',
      key: 'site',
    },
    comProps: {},
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

const ContractSearchForm = props => {
  console.log(' ContractSearchForm ： ', props); //

  const { formBtn } = props; //

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className='contractSearchForm'>
      <ProvinceForm></ProvinceForm>

      {/* <hr className='hrs'  /> */}
      
      <Divider />

      <div className={'flex-bw'}>
        {/* <SmartForm
          flexRow={4}
          config={config}
          formProps={formProps}
          // init={init}
          // init={{}}

          {...props}
        ></SmartForm> */}

        <SearchForm></SearchForm>

        {formBtn}
      </div>
    </div>
  );
};

ContractSearchForm.defaultProps = {};

export default ContractSearchForm;
