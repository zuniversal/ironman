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

const choiceRadios = [
  { label: '是', value: 'yes', key: 'yes' },
  { label: '否', value: 'no', key: 'no' },
];

const config = [
  {
    formType: 'Select',
    itemProps: {
      label: '分配给',
      name: 'handler',
    },
    comProps: {
      className: 'w-280',
    },
  },
];

export const WorkOrderDispatchOrderForm = props => {
  console.log(' WorkOrderDispatchOrderForm ： ', props); //
  const { formBtn, ...rest } = props; //
  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' WorkOrderDispatchOrderForm '}>
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

WorkOrderDispatchOrderForm.defaultProps = {};

export default WorkOrderDispatchOrderForm;
