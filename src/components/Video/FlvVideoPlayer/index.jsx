import React from 'react';
import styles from './index.less';
import EZUIKit from 'ezuikit-js';
export default class FlvVideoPlayer extends React.PureComponent {
  componentDidMount() {
    const { hasKey } = this.props;
    if (hasKey) {
      this.initEzuiVideo();
    } else {
      this.initQhwPlayer();
    }
  }

  initQhwPlayer = () => {
    const { src, playKey } = this.props;
    this.player = new window.QhwwPlayer({
      type: 'flv',
      isLive: true,
      renderType: 'yuv',
      container: '#video-container',
      src,
      minDecoderBufferSize: 1,
      waitingYuvNum: 1,
      waitingPcmDur: 50,
      waitingProbation: 500,
      delayTimeLimit: 1000,
      viewMode: 'contain',
    });
    this.player.on('ready', () => {
      console.log(' initQhwPlayerinitQhwPlayer ready ： ', this.player);
      this.player.controls = false;
      this.player.play();
    });
  };

  initEzuiVideo = () => {
    const { src, playKey } = this.props;
    this.player = new EZUIKit.EZUIKitPlayer({
      id: 'video-container', // 视频容器ID
      accessToken: playKey,
      url: src,
      audio: 0,
    });
    this.player.play();
  };

  componentWillUnmount() {
    this.player && this.player.destroy && this.player.destroy();
  }

  render() {
    return (
      <div>
        <div id="video-container"></div>
      </div>
    );
  }
}
