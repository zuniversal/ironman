import React from 'react';
import './style.less';
import { Radio,  } from 'antd';


const ChoiceRadio = props => {
  console.log(' ChoiceRadio   props, ,   ： ', props);
  return (
    <Radio.Group {...props} >
      <Radio value={'yes'}>是</Radio>
      <Radio value={'false'}>否</Radio>
    </Radio.Group>
  );
};

export default ChoiceRadio;
