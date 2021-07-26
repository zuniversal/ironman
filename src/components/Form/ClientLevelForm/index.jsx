import React, { useEffect } from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm';
import { Form, Button } from 'antd';

const formLayouts = {
  labelCol: {
    sm: { span: 9 }, //
  },
  wrapperCol: {
    sm: { span: 15 }, //
  },
};

const ClientLevelForm = props => {
  const [form] = Form.useForm();

  const config = [
    {
      itemProps: {
        label: '签约次数因子',
        name: '',
      },
    },
    {
      itemProps: {
        label: '金额因子',
        name: '',
      },
    },
    {
      itemProps: {
        label: '签约间隔因子',
        name: '',
      },
    },
  ];

  return (
    <SmartForm
      config={config}
      propsForm={form}
      action={'edit'}
      formLayouts={formLayouts}
      className={'clientLevelForm'}
      {...props}
    >
      <Form.Item label={' '} colon={false} className={`btnWrapper`}>
        <Form.Item>
          <Button onClick={() => props.startEdit({ form, action: 'edit' })}>
            取消
          </Button>
          <Button
            // className={`m-l-10`}
            type="primary"
            onClick={() => props.startEdit({ form, action: 'edit' })}
          >
            确定
          </Button>
        </Form.Item>
      </Form.Item>
    </SmartForm>
  );
};

export default ClientLevelForm;
