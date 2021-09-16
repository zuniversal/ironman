import React, { useState } from 'react';
import './style.less';
import {
  Button,
  Form,
} from 'antd';
import SmartForm from '@/common/SmartForm';
import UploadCom from '@/components/Widgets/UploadCom';
import { genderRadios,  } from '@/configs';

const formLayouts = {
  labelCol: {
    sm: { span: 9 }, //
  },
  wrapperCol: {
    sm: { span: 15 }, //
  },
};

export const UserPasswordForm = props => {
  console.log(' UserPasswordForm ： ', props);
  const [form] = Form.useForm();

  const config = [
    {
      itemProps: {
        label: '密码',
        name: 'password',
      },
    },
    {
      itemProps: {
        label: '再次确认密码',
        name: 'rePassword',
      },
    },
  ];

  return (
    <SmartForm
      config={config}
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
            onClick={() => props.handleOk({ form, action: 'changePwdAsync' })}
          >
            确认修改
          </Button>
        </Form.Item>
      </Form.Item>
    </SmartForm>
  );
};


const UserCenterForm = props => {
  console.log(' UserCenterForm ： ', props);
  const [form] = Form.useForm();

  const config = [
    {
      itemProps: {
        label: '账号',
        name: 'username',
      },
    },
    {
      itemProps: {
        label: '昵称',
        name: 'nickname',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '微信',
        name: 'wechat',
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
      formType: 'Radio',
      itemProps: {
        label: '性别',
        name: 'gender',
      },
      radioData: genderRadios,
    },
    <UploadCom
      label={'头像'}
      key={'head_img'}
      action={'/api/v1/upload'}
      name={'head_img'}
      extra={'支持扩展名:pdf、jpg、png'}
      uploadProps={{
        disabled: props.isDisabledAll || props.action === 'detail',
        accept: 'image/png,image/jpeg,image/pdf,application/pdf',
        multiple: true,
      }}
      init={props.init}
      formAction={props.action}
      noRule
    ></UploadCom>,
  ];

  const { 
    gender, 
  } = props.init; //

  return (
    <SmartForm
      config={config}
      propsForm={form}
      action={'edit'}
      noPh
      formLayouts={formLayouts}
      className={'userCenterForm'}
      {...props}
      init={{
        ...props.init,
        gender: gender != undefined ? gender : 1,
      }}
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

export default UserCenterForm;
