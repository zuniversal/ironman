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
} from 'antd';

import {
  QuestionCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';

const DepForm = () => {
  console.log(' DepForm ： '); //
  return (
    <div>
      <Form.Item
        name="depField"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm depField"
        dependencies={['depField']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your depField!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('depField') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                'The two depFields that you entered do not match!',
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
    </div>
  );
};

export default DepForm; //
