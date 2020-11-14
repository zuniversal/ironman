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
import UploadCom from '@/components/Widgets/UploadCom'; //
import InputCom from '@/components/Widgets/InputCom'; //
import WeakDetailImg from '@/components/Widgets/WeakDetailImg'; //
import { INPUT_TXT } from '@/utils';

const formLayouts = {
  labelCol: {
    sm: { span: 9 }, //
  },
  wrapperCol: {
    sm: { span: 15 }, //
  },
};

const CsUserCenterEditForm = props => {
  console.log(' CsUserCenterEditForm ： ', props); //
  const [form] = Form.useForm();
  const [noRule, setNoRule] = useState(false);

  const res = form.getFieldValue('password'); //
  console.log('  resresres ：', res, noRule); //

  const config = [
    <UploadCom
      label={'更换头像'}
      key={'logo'}
      action={'logo'}
      action={'/api/v1/upload'}
      name={'logo'}
      extra={'仅支持JPG、PNG格式，文件小于1M(方形图)'}
    ></UploadCom>,
    {
      itemProps: {
        label: '国家地区',
        name: 'name',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <div className={`rowWrapper`}>
          <InputCom name={'province'} className={`rowItem`}></InputCom>
          <InputCom name={'city'} className={`rowItem`}></InputCom>
        </div>
      ),
      itemProps: {
        label: '所在省市',
        className: 'w100',
      },
    },
    {
      itemProps: {
        label: '街道地址',
        name: 'custom_id',
      },
    },
    {
      itemProps: {
        label: '联系电话',
        name: 'phone',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <div className={`rowWrapper`}>
          <InputCom name={'prefix'} className={`rowItem`}></InputCom>
          <InputCom name={'phone'} className={`rowItem`}></InputCom>
        </div>
      ),
      itemProps: {
        label: '联系电话',
        className: 'w100',
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
      className={'csUserCenterEditForm'}
      {...props}
    >
      <Form.Item label={' '} colon={false}>
        <Form.Item>
          <Button
            className={`editBtn`}
            type="primary"
            onClick={() => props.startEdit({ form, action: 'edit' })}
          >
            开始修改
          </Button>
        </Form.Item>
      </Form.Item>
    </SmartForm>
  );
};

CsUserCenterEditForm.defaultProps = {};

export default CsUserCenterEditForm;
