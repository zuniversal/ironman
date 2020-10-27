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
  Upload,
  Result,
} from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';

import SmartForm from '@/common/SmartForm'; //
import { regoins } from '@/configs'; //
import { formatConfig } from '@/utils'; //

const formLayouts = {
  labelCol: {
    sm: { span: 9 }, //
  },
  wrapperCol: {
    sm: { span: 15 }, //
  },
};

const UserCenterForm = props => {
  console.log(' UserCenterForm ： ', props); //
  const [form] = Form.useForm();

  const config = [
    {
      noRule: true,
      itemProps: {
        label: '姓名',
        name: 'name',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '角色',
        name: 'custom_id',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '手机',
        name: 'phone',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '邮箱',
        name: 'email',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '业务部门',
        name: 'organization',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      formType: 'Password',
      noRule: true,
      itemProps: {
        label: '密码重置',
        name: 'password',
      },
    },
    {
      formType: 'Password',
      noRule: true,
      itemProps: {
        label: '再次输入密码',
        name: 'rePwd',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={'userCenterForm'}>
      <SmartForm
        // config={config}
        config={formatConfig(config)}
        // config={configs}
        formProps={formProps}
        // init={init}
        // init={{}}
        propsForm={form}
        action={'edit'}
        formLayouts={formLayouts}
        {...props}
      ></SmartForm>

      <div className="dfc actionBtn ">
        <Button type="primary" onClick={() => props.handleOk({ form })}>
          确认修改
        </Button>
      </div>
    </div>
  );
};

UserCenterForm.defaultProps = {};

export default UserCenterForm;
