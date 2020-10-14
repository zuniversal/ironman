import React from 'react';
import PropTypes from 'prop-types'
import './style.less';
import { Form, Input } from 'antd';

const InputCom = props => {
  console.log(' InputCom   props, ,   ： ', props);
  return (
    <div className={`inputFormWrapper ${props.wrapperClass}`}>
      {props.left && <div className="left">{props.left}</div>}
      <Form.Item
        className={'inputFormItem  '}
        key={'attach'}
        name={props.name}
        label={props.label}
        colon={false}
      >
        <Input name="logo" className={'inputCom w-64  '} {...props} />
      </Form.Item>
      {props.right && <div className="right">{props.right}</div>}
    </div>
  );
};

InputCom.defaultProps = {
  name: 'field_name',  
};

InputCom.propTypes = {
  name: PropTypes.string,
};

export default InputCom;
