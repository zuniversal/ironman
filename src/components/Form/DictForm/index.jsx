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

export const config = [
  {
    formType: 'Select',  
    noRule: true,
    itemProps: {
      label: '模块',
      name: 'model',
    },
  },
  {
    itemProps: {
      label: '名称',
      name: 'name',
    },
  },
  {
    formType: 'TextArea',  
    noRule: true,
    itemProps: {
      label: '枚举值',
      name: 'value',
    },
  },
  {
    noRule: true,
    itemProps: {
      label: '关联设备',
      name: 'equipment_id',
    },
  },
  {
    formType: 'TextArea',  
    noRule: true,
    itemProps: {
      label: '备注',
      name: 'remark',
    },
  },

  
];



const DictForm = props => {
  console.log(' DictForm ： ', props); //
  const {formBtn, ...rest } = props// 
  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' DictForm '}>
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

DictForm.defaultProps = {};

export default DictForm;
