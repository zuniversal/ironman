import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { Form, Input } from 'antd';

const InputCom = props => {
  console.log(' InputCom   props, ,   ： ', props);
  const { wrapperClass, left, right, ...rest } = props;
  return (
    <div className={`inputFormWrapper ${wrapperClass}`}>
      {left && <div className="left">{left}</div>}
      <Form.Item
        className={'inputFormItem  '}
        key={'attach'}
        name={props.name}
        label={props.label}
        colon={false}
      >
        <Input name="logo" className={'inputCom w-64  '} {...rest} />
      </Form.Item>
      {right && <div className="right">{right}</div>}
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
