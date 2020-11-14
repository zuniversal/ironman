import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { Table, Icon, notification, Modal, Button, Tag } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import ReactPlayer from 'react-player';
import Videojs from 'video.js';
import Hls from 'hls.js';

// 添加hls插件，以保证播放m3u8格式的视频
import 'videojs-contrib-hls';
// 导入videojs 的样式
import 'video.js/dist/video-js.css';
// 自定义样式（见下文）
// 给window上添加videojs, zh-CN.js 语言注册依赖 videojs.addLanguage()方法
// 配置了不生效的话  把public/index.html  里的标签  <html lang="en">  </html>   lang设置为 "zh-CN"
window.videojs = Videojs;
import('video.js/dist/lang/zh-CN.js');

class SmartVideo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      videoId: 'custom-video',
    };
  }
  // componentDidMount() {
  //   const { height, width, src } = this.props;
  //   this.player = Videojs(
  //     'custom-video',
  //     {
  //       height,
  //       width,
  //       bigPlayButton: true,
  //       textTrackDisplay: false,
  //       errorDisplay: false,
  //       controlBar: true,
  //       type: 'application/x-mpegURL',
  //       src,
  //     },
  //     function() {
  //   console.log(' thiser  ： ', this.play); //
  //       this.play();
  //     },
  //   );
  //   // this.player.src({ src });
  //   // this.player.play();
  // }

  render() {
    const { children, title } = this.props;
    console.log(
      ' %c SmartVideo 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    ); //

    return (
      <div
        className="custom-video-warpper"
        style={{
          display: this.props.src ? 'block' : 'none',
        }}
      >
        <ReactPlayer
          className="react-player"
          //这里是由上级页面传过来的视频地址
          url={this.props.src}
          playing
          width="100%"
          controls
          config={{
            file: {
              forceHLS: true,
            },
          }}
        />
        {/* <video
          id="custom-video"
          className="video-js"
          controls
          preload="auto"
        ></video> */}
        {/* video标签的className一定要是 "video-js",否则样式不生效 */}
        {/* <video id={this.state.videoId} className="video-js" /> */}
      </div>
    );
  }
}

SmartVideo.defaultProps = {
  title: '默认标题',
  okTxt: '确定',
  src: '',
  height: '360',
  width: '640',
};

SmartVideo.propTypes = {
  // 视频地址
  src: PropTypes.string,
  // 视频高度
  height: PropTypes.string,
  // 视频宽度
  width: PropTypes.string,
};

export default SmartVideo;
