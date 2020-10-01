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

const renderCheckboxOp = [{ label: '短信通知客户', value: 'yes', key: 'yes' }];

export const InspectMissionAssignForm = props => {
  console.log(' InspectMissionAssignForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'Select',
      itemProps: {
        label: '分配给',
      },
      comProps: {
        className: 'w-280',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' InspectMissionAssignForm '}>
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

InspectMissionAssignForm.defaultProps = {};

export const InspectMissionEditDateForm = props => {
  console.log(' InspectMissionEditDateForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'DatePicker',
      itemProps: {
        label: '选择日期',
      },
      comProps: {
        className: 'w-280',
      },
    },
    {
      formType: 'Checkbox',
      itemProps: {
        label: '',
        className: 'centerFormItem',
      },
      // checkboxContent: '短信通知客户',
      checkboxData: renderCheckboxOp,
      noLabel: true,
      comProps: {
        labelCol: {
          xs: { span: 0 },
          sm: { span: 0 }, //
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 24 }, //
        },
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' inspectMissionEditDateForm '}>
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

InspectMissionEditDateForm.defaultProps = {};
