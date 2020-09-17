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






const MissionsSearchForm = props => {
  console.log(' MissionsSearchForm ： ', props); //
  const {formBtn, ...rest } = props// 

    
  const config = [
    {
      formType: 'Select', 
      itemProps: {
        label: '状态',
      },
    },
    
  ];



  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' MissionsSearchForm '}>
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

MissionsSearchForm.defaultProps = {};

export default MissionsSearchForm;
