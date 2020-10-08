import React from 'react';
import './style.less';
import { Form, Input } from 'antd';
import Icon from '@/components/Widgets/Icons'; //

const DeviceStatus = props => {
  console.log(' DeviceStatus   props, ,   ： ', props);
  return (
    <div className="deviceStatus ">
      <div className="left">
        <div className="left">温度</div>
        <div className="left">26.4℃</div>
      </div>
      <div className="right">
        <Icon icon={'home'} className={'setting'}></Icon>
        状态
      </div>
    </div>
  );
};

const CsHomeMonitor = props => {
  console.log(' CsHomeMonitor   props, ,   ： ', props);
  return (
    <div className="csHomeMonitor ">
      <div className="left">
        <DeviceStatus></DeviceStatus>
      </div>
      <div className="center">img</div>
      <div className="right"></div>
    </div>
  );
};

export default CsHomeMonitor;
