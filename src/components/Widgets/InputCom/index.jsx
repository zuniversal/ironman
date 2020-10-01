import React from 'react';
import './style.less';
import { Form, Input } from 'antd';

const InputCom = props => {
  console.log(' InputCom   props, ,   ： ', props);
  return (
    <div className="inputFormWrapper ">
      {props.left && <div className="left">{props.left}</div>}
      <Form.Item
        className={'inputFormItem  '}
        key={'attach'}
        name="field6"
        label={props.label}
        colon={false}
        // extra="支持扩展名：.pdf"
      >
        <Input name="logo" className={'inputCom w-64  '} {...props} />
      </Form.Item>
      {props.right && <div className="right">{props.right}</div>}
    </div>
  );
};

export default InputCom;
