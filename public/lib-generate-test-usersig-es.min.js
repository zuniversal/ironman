import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

import TIM from 'tim-js-sdk';
// 发送图片、文件等消息需要的 COS SDK
import COS from 'cos-js-sdk-v5';

const SmartTim = props => {
  console.log(' SmartTim ： ', props); //
  return <div className="SmartTim">SmartTim</div>;
};

SmartTim.defaultProps = {
  className: '',
};

SmartTim.propTypes = {
  className: PropTypes.string,
};

export default SmartTim;
