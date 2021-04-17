import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

import TIM from 'tim-js-sdk';
// 发送图片、文件等消息需要的 COS SDK
import COS from 'cos-js-sdk-v5';
// import './lib-generate-test-usersig.min.js';
// import LibGenerateTestUserSig from './lib-generate-test-usersig.min.js'
// import tim from './tim';

const SmartTim = props => {
  console.log(' SmartTim ： ', props);
  tim.on(TIM.EVENT.SDK_READY, onReadyStateUpdate, data => {
    console.log(' SmartTim datadata ： ', data);
    // const isSDKReady = name === this.TIM.EVENT.SDK_READY ? true : false
    // this.$store.commit('toggleIsSDKReady', isSDKReady)
    // if (isSDKReady) {
    //   this.tim
    //     .getMyProfile()
    //     .then(({ data }) => {
    //       this.$store.commit('updateCurrentUserProfile', data)
    //     })
    //     .catch(error => {
    //       this.$store.commit('showMessage', {
    //         type: 'error',
    //         message: error.message
    //       })
    //     })
    //   this.$store.dispatch('getBlacklist')
    // }
  });

  return <div className="SmartTim">SmartTim</div>;
};

SmartTim.defaultProps = {
  className: '',
};

SmartTim.propTypes = {
  className: PropTypes.string,
};

export default SmartTim;
