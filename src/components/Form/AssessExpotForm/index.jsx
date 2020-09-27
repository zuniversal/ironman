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
import { formatConfig } from '@/utils'; //

export const config = [
  {
    formType: 'DatePicker',
    itemProps: {
      label: '选择月份',
    },
  },
];

const AssessExpotForm = props => {
  console.log(' AssessExpotForm ： ', props); //
  const { formBtn, ...rest } = props; //
  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' AssessExpotForm '}>
      <SearchForm
        // flexRow={6}
        // config={config}
        config={formatConfig(config)}
        formProps={formProps}
        // init={init}
        // init={{}}

        {...rest}
      ></SearchForm>

      {formBtn}
    </div>
  );
};

AssessExpotForm.defaultProps = {};

export default AssessExpotForm;
