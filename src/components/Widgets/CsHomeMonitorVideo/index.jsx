import React from 'react';
import './style.less';
import { Form, Input } from 'antd';

import InputCom from '@/components/Widgets/InputCom'; //

const CsHomeMonitorVideo = props => {
  console.log(' CsHomeMonitorVideo   props, ,   ： ', props);
  return (
    <div className="csHomeMonitorVideo ">
      {props.config.map((v, i) => (
        <div {...v} key={i}>
          <InputCom {...v} key={i}></InputCom>
        </div>
      ))}
    </div>
  );
};

export default CsHomeMonitorVideo;
