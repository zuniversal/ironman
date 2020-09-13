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
import { regoins } from '@/configs'//
import { formatConfig, reportRadioOp,  } from '@/utils'//  

export const config = [
  {
    formType: 'Select',
    noRule: true,  
    itemProps: {
      label: '客户',
    },
    comProps: {
      className: 'w-160',  
    },  
  },
  {
    formType: 'Select',
    noRule: true,  
    itemProps: {
      label: '户号',
    },
    comProps: {
      className: 'w-160',  
    },  
  },
  {
    formType: 'Cascader',
    noRule: true,  
    itemProps: {
      label: '区域',
    },
    comProps: {
      className: 'w-160',  
    },  
  },
  {
    formType: 'Input',
    noRule: true,  
    itemProps: {
      label: '邮编',
    },
    comProps: {
      className: 'w-160',  
    },  
  },

  
];



const HouseNoSearchForm = props => {
  console.log(' HouseNoSearchForm ： ', props); //
  const {formBtn, ...rest } = props// 
  const formProps = {
    // layout: 'vertical',
    layout: 'inline',
  };

  return (
    <div className={'fsb HouseNoSearchForm '}>
      <SmartForm
        // flexRow={4}
        // flexRow={6}
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

HouseNoSearchForm.defaultProps = {};

export default HouseNoSearchForm;
