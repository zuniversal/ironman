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

const InspectMissionForm = props => {
  console.log(' InspectMissionForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'rowText',
      itemProps: {
        label: '电气告警条件',
      },
    },
    {
      itemProps: {
        label: '设备状态',
        // name: '',
      },
    },
    {
      itemProps: {
        label: '持续',
        // name: '',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '能耗阈值',
      },
    },
    {
      itemProps: {
        label: '能耗过低',
        // name: '',
      },
    },
    {
      itemProps: {
        label: '能耗过高',
        // name: '',
      },
    },
    {
      itemProps: {
        label: '持续',
        // name: '',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '电流阈值',
      },
    },
    {
      itemProps: {
        label: '电流过低',
        // name: '',
      },
    },
    {
      itemProps: {
        label: '电流过高',
        // name: '',
      },
    },
    {
      itemProps: {
        label: '持续',
        // name: '',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '电压阈值',
      },
    },
    {
      itemProps: {
        label: '电压过低',
        // name: '',
      },
    },
    {
      itemProps: {
        label: '电压过高',
        // name: '',
      },
    },
    {
      itemProps: {
        label: '持续',
        // name: '',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '温度阈值',
      },
    },
    {
      itemProps: {
        label: '温度过低',
        // name: '',
      },
    },
    {
      itemProps: {
        label: '温度过高',
        // name: '',
      },
    },
    {
      itemProps: {
        label: '持续',
        // name: '',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '湿度阈值',
      },
    },
    {
      itemProps: {
        label: '湿度过低',
        // name: '',
      },
    },
    {
      itemProps: {
        label: '湿度过高',
        // name: '',
      },
    },
    {
      itemProps: {
        label: '持续',
        // name: '',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' InspectMissionForm '}>
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

InspectMissionForm.defaultProps = {};

export default InspectMissionForm;
