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

export const MissionsManageWorkOrderForm = props => {
  console.log(' MissionsManageWorkOrderForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      itemProps: {
        label: '客户',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      itemProps: {
        label: '名称',
      },
    },
    {
      formType: 'Select',
      itemProps: {
        label: '类型',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      formType: 'Select',
      itemProps: {
        label: '分配给',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' MissionsManageWorkOrderForm '}>
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

MissionsManageWorkOrderForm.defaultProps = {};

export const MissionsManageContractForm = props => {
  console.log(' MissionsManageContractForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'Select',
      itemProps: {
        label: '选择合同',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' MissionsManageContractForm '}>
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

MissionsManageContractForm.defaultProps = {};
