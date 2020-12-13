import React from 'react';
import './style.less';

const AlarmNotifyInfo = props => {
  // console.log(' AlarmNotifyInfo   props, ,   ： ', props,   );
  return (
    <div className={'alarmNotifyInfo'}>
      <div className={'status'}>待处理</div>
      <div className={'content'}>
        您的xxx监测点，电压过低，当前值12 低于过低阈值20触发告警
      </div>
      <div className={'time'}>开始时间：2020-10-10 10:10</div>
    </div>
  );
};

export default AlarmNotifyInfo;
