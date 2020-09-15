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
    itemProps: {
      label: '班组姓名',
    },
  },
  {
    itemProps: {
      label: '组长姓名',
    },
  },
  {
    itemProps: {
      label: '组员姓名',
    },
  },
  {
    formType: 'Select', 
    itemProps: {
      label: '类型',
    },
  },
  {
    itemProps: {
      label: '车辆牌照',
    },
  },
  

  
];



const ShiftsManageForm = props => {
  console.log(' ShiftsManageForm ： ', props); //
  const {formBtn, ...rest } = props// 
  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' ShiftsManageForm '}>
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

ShiftsManageForm.defaultProps = {};

export default ShiftsManageForm;
