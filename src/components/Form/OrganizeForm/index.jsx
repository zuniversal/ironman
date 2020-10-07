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





const selectData = [
  { label: '部门1', value: 'app1', 
    children: [
      { label: '子部门1', value: 'msg1' },
      { label: '子部门2', value: 'email1' },
    ],   
  },
  { label: '部门2', value: 'app2', 
    children: [
      { label: '子部门1', value: 'msg2' },
      { label: '子部门2', value: 'email2' },
    ],   
  },

]




export const config = [
  {
    itemProps: {
      label: '部门名称',
      name: 'name',
    },
  },
  {
    formType: 'Select',
    itemProps: {
      label: '上级部门',
      name: 'parent_id',
    },
    opType: 'group',  
    selectData: selectData,
  },

  
];



const OrganizeForm = props => {
  console.log(' OrganizeForm ： ', props); //
  const {formBtn, ...rest } = props// 
  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' OrganizeForm '}>
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

OrganizeForm.defaultProps = {};

export default OrganizeForm;
