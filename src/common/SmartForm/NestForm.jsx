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
  InputNumber,
} from 'antd';

import {
  QuestionCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

// 注意 <InputNumber />  会导致报错 TypeError: react_redux_lib_default(...) is not a function

const NestForm = () => (
  <div>
    <Form.Item name={['user', 'name']} label="Name">
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'email']} label="Email">
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'age']} label="Age">
      <Input />
      {/* {<InputNumber />}
        {(() => <InputNumber />)()} */}
    </Form.Item>
    <Form.Item name={['user', 'website']} label="Website">
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'introduction']} label="Introduction">
      <Input.TextArea />
    </Form.Item>
    {/* <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> */}
  </div>
);

export default NestForm; //
