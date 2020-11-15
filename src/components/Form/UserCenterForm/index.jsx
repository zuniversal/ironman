import React, { useState } from 'react';
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
import { INPUT_TXT } from '@/utils';

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
  const [noRule, setNoRule] = useState(false);

  const res = form.getFieldValue('password'); //
  console.log('  resresres ：', res, noRule); //

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
        name: 'role',
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
      noRule: !noRule, //
      itemProps: {
        label: '重置密码',
        name: 'password',
      },
      comProps: {
        onChange: e => {
          console.log('  resresres onChange ：', e, e.target.value); //
          setNoRule(e.target.value);
        },
      },
    },
    {
      formType: 'Password',
      // noRule: noRule,//
      itemProps: {
        label: '再次输入密码',
        name: 'rePwd',
        dependencies: ['password'],
        rules: [
          {
            required: noRule,
            message: '请再次输入密码',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(`2次输入密码不一致！`);
            },
          }),
        ],
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <SmartForm
      config={config}
      // config={configs}
      formProps={formProps}
      // init={init}
      // init={{}}
      propsForm={form}
      action={'edit'}
      noPh
      formLayouts={formLayouts}
      className={'userCenterForm'}
      {...props}
    >
      <Form.Item label={' '} colon={false}>
        <Form.Item>
          <Button
            className={`editBtn`}
            type="primary"
            onClick={() => props.handleOk({ form, action: 'edit' })}
          >
            确认修改
          </Button>
        </Form.Item>
      </Form.Item>
    </SmartForm>
  );
};

UserCenterForm.defaultProps = {};

export default UserCenterForm;
