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
    itemProps: {
      label: '枚举值',
    },
  },
  {
    itemProps: {
      label: '关联设备',
    },
  },
  {
    itemProps: {
      label: '备注',
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
