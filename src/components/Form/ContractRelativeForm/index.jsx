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
    formType: 'rowText',
    rowText: '基本信息:',
    // noRule: true,
    itemProps: {
      label: '基本信息:',
      key: 'rowText',
    },
  },

  {
    // formType: 'Select',
    itemProps: {
      label: '是否新客户',
    },
  },
  {
    // formType: 'Select',
    itemProps: {
      label: '客户名称',
    },
  },
  {
    // formType: 'Select',
    itemProps: {
      label: '客户类型',
    },
  },

  {
    // formType: 'Select',
    itemProps: {
      label: '所属行业',
    },
  },

  {
    // formType: 'Select',
    itemProps: {
      label: '企业规模',
    },
  },

  {
    // formType: 'Select',
    itemProps: {
      label: '资产规模',
    },
  },

  {
    // formType: 'Select',
    itemProps: {
      label: '总面积',
    },
  },

  {
    // formType: 'Select',
    itemProps: {
      label: '占地面积',
    },
  },

  {
    // formType: 'Select',
    itemProps: {
      label: '企业LOGO',
    },
  },

  {
    formType: 'rowText',
    rowText: '位置信息:',
    // noRule: true,
    itemProps: {
      label: '位置信息:',
      key: 'rowText',
    },
  },
  {
    // formType: 'Select',
    itemProps: {
      label: '省份',
    },
  },

  {
    // formType: 'Select',
    itemProps: {
      label: '经度',
    },
  },

  {
    // formType: 'Select',
    itemProps: {
      label: '纬度',
    },
  },

  {
    // formType: 'Select',
    itemProps: {
      label: '详细地址',
    },
  },

  {
    formType: 'rowText',
    rowText: '管理员信息:',
    // noRule: true,
    itemProps: {
      label: '管理员信息:',
      key: 'rowText',
    },
  },
  {
    // formType: 'Select',
    itemProps: {
      label: '用户名',
    },
  },

  {
    // formType: 'Select',
    itemProps: {
      label: '密码',
    },
  },

  {
    // formType: 'Select',
    itemProps: {
      label: '手机号',
    },
  },

  {
    formType: 'rowText',
    rowText: '其他信息:',
    // noRule: true,
    itemProps: {
      label: '其他信息:',
      key: 'rowText',
    },
  },
  {
    // formType: 'Select',
    itemProps: {
      label: '附件',
    },
  },
];

const init = {
  name: 'zyb',
  role: '巡检人员',
  tel: 'zyb',
  email: 'zyb',
  dep: '巡检运维',
  // password
  // password2
  // select
};

const ContractRelativeForm = props => {
  console.log(' ContractRelativeForm ： ', props); //

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  const formConfig = formatConfig(config);
  console.log(' formConfig ： ', formConfig); //

  return (
    <div className={''}>
      <SmartForm
        flexRow={4}
        // config={formatConfig(config)}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        {...props}
      ></SmartForm>
    </div>
  );
};

ContractRelativeForm.defaultProps = {};

export default ContractRelativeForm;
