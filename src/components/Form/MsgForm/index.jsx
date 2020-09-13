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
import { formatConfig } from '@/utils'//




const checkboxGroupOptions = [
  { label: '应用内通知', value: 'app' },
  { label: '短信', value: 'msg' },
  { label: '邮件', value: 'email' },

]

const selectData = [
  { label: '应用内通知', value: 'app' },
  { label: '短信', value: 'msg' },
  { label: '邮件', value: 'email' },

]



export const config = [
  {
    formType: 'TextArea',  
    itemProps: {
      label: '消息内容',
    },
  },
  {
    formType: 'CheckboxGroup',  
    itemProps: {
      label: '通知方法',
    },
    comProps: {
      options: checkboxGroupOptions,
    },
    // checkboxContent: 
  },
  {
    formType: 'Select',  
    itemProps: {
      label: '通知人员',
    },
    selectData: selectData,
  },

  
];



const MsgForm = props => {
  console.log(' MsgForm ： ', props); //
  const {formBtn, ...rest } = props// 
  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' MsgForm '}>
      <SmartForm
        // flexRow={6}
        // config={config}
        config={formatConfig(config)}
        formProps={formProps}
        // init={init}
        // init={{}}

        {...rest}
      ></SmartForm>

      {formBtn}
    </div>
  );
};

MsgForm.defaultProps = {};

export default MsgForm;
