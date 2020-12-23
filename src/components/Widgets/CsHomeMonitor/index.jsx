import React from 'react';
import './style.less';
import { Form, Divider } from 'antd';
import Icon from '@/components/Widgets/Icons'; //

const config = [
  {
    valKey: 't',
    title: '温度',
    statusKey: 'wdStatus',
    unit: '℃',
  },
  {
    valKey: 's',
    title: '湿度',
    statusKey: 'sdStatus',
  },
];

const DeviceStatus = props => {
  console.log(' DeviceStatus   props, ,   ： ', props);
  return (
    <div className="deviceInfo ">
      <div className="left">
        <div className="text">温度</div>
        <div className="val">
          {props.data[props.valKey]}
          {props.unit}
        </div>
      </div>
      <div className="right">
        <Icon icon={'powerStatus'} className={'setting'}></Icon>
        <div className="status">{props.data[props.statusKey]}</div>
      </div>
    </div>
  );
};

const CsHomeMonitor = props => {
  console.log(' CsHomeMonitor   props, ,   ： ', props);
  return (
    <div className="csHomeMonitor ">
      {config.map((v, i) => (
        <DeviceStatus {...v} {...props} key={v.valKey}></DeviceStatus>
      ))}
      {/* <DeviceStatus></DeviceStatus>
      <Divider></Divider>
      <DeviceStatus></DeviceStatus> */}
      {/* <div className="deviceStatus">设备状态</div> */}
      <div className="deviceStatus">{props.data.equipmentStatus}</div>
    </div>
  );
};

export default CsHomeMonitor;
