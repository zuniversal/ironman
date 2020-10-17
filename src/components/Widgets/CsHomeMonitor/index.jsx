import React from 'react';
import './style.less';
import { Form, Divider } from 'antd';
import Icon from '@/components/Widgets/Icons'; //

const DeviceStatus = props => {
  console.log(' DeviceStatus   props, ,   ： ', props);
  return (
    <div className="deviceInfo ">
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

const CsHomeMonitor = props => {
  console.log(' CsHomeMonitor   props, ,   ： ', props);
  return (
    <div className="csHomeMonitor ">
      <DeviceStatus></DeviceStatus>
      <Divider></Divider>
      <DeviceStatus></DeviceStatus>
      <div className="deviceStatus">设备状态</div>
    </div>
  );
};

export default CsHomeMonitor;
