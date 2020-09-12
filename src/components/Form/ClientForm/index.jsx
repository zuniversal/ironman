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

export const config = [
  {
    formType: 'rowText',
    // rowText: '基本信息',
    // noRule: true,
    itemProps: {
      label: '基本信息',
      key: 'rowText',
    },
  },
  {
    // formType: 'Select',
    itemProps: {
      label: '客户名称',
    },
    comProps: {},
  },
  {
    formType: 'Select',
    itemProps: {
      label: '客户类型',
    },
    comProps: {},
  },
  {
    formType: 'Select',
    itemProps: {
      label: '所属行业',
    },
    comProps: {},
  },
  {
    formType: 'Select',
    itemProps: {
      label: '企业规模',
    },
    comProps: {},
  },
  {
    formType: 'Select',
    itemProps: {
      label: '资产规模',
    },
    comProps: {},
  },
  {
    // formType: 'Select',
    itemProps: {
      label: '总面积',
    },
    comProps: {},
  },
  {
    // formType: 'Select',
    itemProps: {
      label: '占地面积',
    },
    comProps: {},
  },
  {
    // formType: 'Select',
    itemProps: {
      label: '企业LOGO',
    },
    comProps: {},
  },

  {
    formType: 'rowText',
    // rowText: '位置信息',
    // noRule: true,
    itemProps: {
      label: '位置信息',
      key: 'rowText',
    },
  },
  {
    formType: 'Cascader',
    itemProps: {
      label: '区域',
    },
    comProps: {
      options: regoins,
    },
  },
  {
    // formType: 'Select',
    itemProps: {
      label: '详细地址',
    },
    comProps: {},
  },
  {
    // formType: 'Select',
    itemProps: {
      label: '经度',
    },
    comProps: {},
  },
  {
    // formType: 'Select',
    itemProps: {
      label: '纬度',
    },
    comProps: {},
  },

  {
    formType: 'rowText',
    rowText: '管理员信息',
    noRule: true,
    itemProps: {
      label: '管理员信息',
      key: 'rowText',
    },
  },
  {
    formType: 'Dynamic',
    itemProps: {
      // label: '',
      label: '用户名',
    },
    comProps: {
      itemProps: {
        label: '用户名',
      },
      comProps: {
        className: 'w-320',  
      },
    },
  },
  {
    // formType: 'Select',
    itemProps: {
      label: '密码',
    },
    comProps: {},
  },
  {
    // formType: 'Select',
    itemProps: {
      label: '手机号',
    },
    comProps: {},
  },

  {
    formType: 'rowText',
    // rowText: '其他信息',
    noRule: true,
    itemProps: {
      label: '其他信息',
      key: 'rowText',
    },
  },
  {
    itemProps: {
      label: '附件',
    },
    comProps: {},
  },
];

// const formConfig = config.map((v, i) => ({ ...v, itemProps:  v.formType === 'rowText' ? {...v.itemProps} : {...v.itemProps, key: `key{i}`, name: `name${i}`, },    }))
// const formConfig = config.map((v, i) => ({ ...v, itemProps:  {...v.itemProps, key: `key{i}`, name: `name${i}`, noRule: v.formType === 'rowText',   },   }))
const formConfig = config.map((v, i) => ({
  ...v,
  itemProps: { ...v.itemProps, key: `key${i}`, name: `name${i}` },
}));
// console.log(' formConfig  config.map v ： ', formConfig,   )

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

const ClientForm = props => {
  console.log(' ClientForm ： ', props); //

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={''}>
      <SmartForm
        // flexRow={4}
        config={formConfig}
        formProps={formProps}
        // init={init}
        // init={{}}
        init={{
          key9: regoins,
        }}
        {...props}
      ></SmartForm>
    </div>
  );
};

ClientForm.defaultProps = {};

export default ClientForm;
