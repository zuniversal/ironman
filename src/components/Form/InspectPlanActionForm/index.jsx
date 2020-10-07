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






export const InspectPlanNotifyForm = props => {
  console.log(' InspectPlanNotifyForm ： ', props); //
  const {formBtn, ...rest } = props// 

    
  const config = [
    {
      formType: 'Checkbox',
      itemProps: {
        label: '短信通知客户',
        name: '',
      },
    },
  ];



  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' InspectPlanNotifyForm '}>
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

InspectPlanNotifyForm.defaultProps = {};

export default InspectPlanNotifyForm;