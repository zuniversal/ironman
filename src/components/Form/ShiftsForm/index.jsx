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
    },
  },
  {
    itemProps: {
      label: '名称',
    },
  },
  {
    formType: 'TextArea',  
    noRule: true,
    itemProps: {
      label: '枚举值',
    },
  },
  {
    noRule: true,
    itemProps: {
      label: '关联设备',
    },
  },
  {
    formType: 'TextArea',  
    noRule: true,
    itemProps: {
      label: '备注',
    },
  },

  
];



const ShiftsForm = props => {
  console.log(' ShiftsForm ： ', props); //
  const {formBtn, ...rest } = props// 
  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' ShiftsForm '}>
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

ShiftsForm.defaultProps = {};

export default ShiftsForm;
