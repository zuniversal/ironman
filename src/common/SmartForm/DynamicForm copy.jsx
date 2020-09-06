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

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const DynamicForm = props => {
  console.log(' DynamicForm ： ', props); //
  const { key } = props; //

  return (
    <Form.List name="dynamicForm">
      {(fields, params) => {
        const { add, remove } = params;
        console.log(' params ： ', fields, params); //

        return (
          <div>
            {fields.map((field, index) => {
              const fieldKey = key ? key : field.key; //
              console.log('  fieldKey ：', field, key, fieldKey); //

              return (
                <Form.Item
                // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                // label={index === 0 ? 'Passengers' : ''}
                // required={false}

                // name={[field.name, fieldKey]}
                // key={fieldKey}
                >
                  <Form.Item
                    {...field}
                    name={[field.name, fieldKey]}
                    key={fieldKey}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message:
                          "Please input passenger's name or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="passenger name"
                      // style={{ width: '60%' }}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      // style={{ margin: '0 8px' }}
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  ) : null}
                </Form.Item>
              );
            })}

            <Form.Item
            // label={'zyb'}
            >
              <Button
                type="dashed"
                onClick={() => {
                  add();
                }}
                // style={{ width: '60%' }}
              >
                <PlusOutlined /> Add field
              </Button>
              <Button
                type="dashed"
                onClick={() => {
                  add('The head item', 0);
                }}
                // style={{ width: '60%', marginTop: '20px' }}
              >
                <PlusOutlined /> Add field at head
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
};
export default DynamicForm; //
