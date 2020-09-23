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






const WorkOrderSearchForm = props => {
  console.log(' WorkOrderSearchForm ： ', props); //
  const {formBtn, ...rest } = props// 

    
  const config = [
    {
      formType: 'Select', 
      itemProps: {
        label: '处理人',
      },
    },
    {
      formType: 'Select', 
      itemProps: {
        label: '状态',
      },
    },

    
  ];



  const formProps = {
    // layout: 'vertical',
    layout: 'inline',
  };

  return (
    <div className={' WorkOrderSearchForm '}>
      <SmartForm
        // flexRow={6}
        // config={config}
        config={formatConfig(config)}
        formProps={formProps}
        // init={init}
        // init={{}}

        noRuleAll
        {...rest}
      ></SmartForm>

      {formBtn}
    </div>
  );
};

WorkOrderSearchForm.defaultProps = {};

export default WorkOrderSearchForm;
