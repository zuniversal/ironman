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

const MissionsForm = props => {
  console.log(' MissionsForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      itemProps: {
        label: '客户',
      },
    },
    {
      itemProps: {
        label: '名称',
      },
    },
    {
      formType: 'TextArea',
      itemProps: {
        label: '任务描述',
      },
    },
    {
      itemProps: {
        label: '联系人',
      },
    },
    {
      itemProps: {
        label: '电话',
      },
    },
    {
      itemProps: {
        label: '地址',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' MissionsForm '}>
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

MissionsForm.defaultProps = {};

export default MissionsForm;
