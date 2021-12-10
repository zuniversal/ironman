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

import SmartForm from '@/common/SmartForm';
import WeakDetailImg from '@/components/Widgets/WeakDetailImg';
import { INPUT_TXT } from '@/utils';

const formLayouts = {
  labelCol: {
    sm: { span: 9 }, //
  },
  wrapperCol: {
    sm: { span: 15 }, //
  },
};

const CsUserCenterForm = props => {
  const [form] = Form.useForm();
  const [noRule, setNoRule] = useState(false);

  const res = form.getFieldValue('password');
  console.log('  resresres ：', res, noRule);

  const config = [
    {
      formType: 'CustomCom',
      // CustomCom: <WeakDetailImg className={`logo`}></WeakDetailImg>,
      CustomCom: <img className={`logo`} src={props.init.logo} />,
      itemProps: {
        label: '头像',
      },
    },
    {
      itemProps: {
        label: '姓名',
        name: 'name',
      },
    },
    {
      itemProps: {
        label: '公司',
        name: 'enterprise_name',
      },
    },
    {
      itemProps: {
        label: '户号',
        name: 'elecno',
      },
    },
    {
      itemProps: {
        label: '电话',
        name: 'phone',
      },
    },
    {
      itemProps: {
        label: '地址',
        name: 'addr',
        name: 'adrr',
      },
    },
    // {
    //   itemProps: {
    //     label: '告警频率',
    //     name: '',
    //   },
    // },
  ];

  return (
    <SmartForm
      config={config}
      // config={configs}
      propsForm={form}
      action={'edit'}
      noPh
      isDisabledAll
      formLayouts={formLayouts}
      className={'csUserCenterForm'}
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

CsUserCenterForm.defaultProps = {
  init: {},
};

export default CsUserCenterForm;
