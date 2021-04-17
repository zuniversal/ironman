import React from 'react';
import './style.less';
import { Form, Input } from 'antd';

import InputCom from '@/components/Widgets/InputCom';

const FlexInput = props => {
  console.log(' FlexInput   props, ,   ： ', props);
  return (
    <div className="flexInput ">
      {props.config.map((v, i) => (
        <div {...v} key={i}>
          <InputCom {...v} key={i}></InputCom>
        </div>
      ))}
    </div>
  );
};

export default FlexInput;
