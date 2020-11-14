import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { Form, Input } from 'antd';

import SmartVideo from '@/common/SmartVideo'; //
import InputCom from '@/components/Widgets/InputCom'; //

const CsHomeMonitorVideo = props => {
  console.log(' CsHomeMonitorVideo   props, ,   ： ', props);
  return (
    <div className="csHomeMonitorVideo ">
      <div className="row fsb">
        <div className={'monitorTitle'}>监控视频</div>
        <div className={'seeMore'}>查看更多</div>
      </div>
      {/* {props.config.map((v, i) => ( */}
      {[0, 1].map((v, i) => (
        <div className={`monitorVideo ${i === 0 ? 'first' : ''}`} key={i}>
          {/* <SmartVideo ></SmartVideo> */}
        </div>
      ))}
    </div>
  );
};

CsHomeMonitorVideo.defaultProps = {
  config: [],
};

CsHomeMonitorVideo.propTypes = {
  config: PropTypes.array,
};

export default CsHomeMonitorVideo;
