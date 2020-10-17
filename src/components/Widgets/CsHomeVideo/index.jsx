import React from 'react';
import './style.less';
import { Form, Input } from 'antd';
import Icon from '@/components/Widgets/Icons'; //

const DeviceStatus = props => {
  console.log(' DeviceStatus   props, ,   ： ', props);
  return (
    <div className="deviceStatus ">
      <div className="left">
        <div className="text">温度</div>
        <div className="val">26.4℃</div>
      </div>
      <div className="right">
        <Icon icon={'home'} className={'setting'}></Icon>
        <div className="status">状态</div>
      </div>
    </div>
  );
};

const CsHomeVideo = props => {
  console.log(' CsHomeVideo   props, ,   ： ', props);
  return (
    <div className="CsHomeVideo ">
      <DeviceStatus></DeviceStatus>
      <div className="center">img</div>
      <div className="right"></div>
    </div>
  );
};

export default CsHomeVideo;
