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

const getFields = () => {
  // const count = expand ? 10 : 6;
  const children = [];

  for (let i = 0; i < 6; i++) {
    children.push(
      <Col span={8} key={i}>
        <Form.Item
          name={`field-${i}`}
          label={`Field ${i}`}
          rules={[
            {
              required: true,
              message: 'Input something!',
            },
          ]}
        >
          <Input placeholder="placeholder" />
        </Form.Item>
      </Col>,
    );
  }

  return children;
};

// 注意 如果在子组件内部 同时调用同一份 循环组件  函数方式调用 组件会导致报 元素 key 重复  bug
// [DOM] Found 2 elements with non-unique id #register_field-0:

const SearchForm = () => {
  console.log(' SearchForm ： '); //
  return (
    <div>
      {/* {getFields()} */}
      <Row gutter={24}>{getFields()}</Row>
    </div>
  );
};

export default SearchForm; //
