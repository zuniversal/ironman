import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import ReactPlayer from 'react-player';

const SmartVideo = props => {
  console.log(' SmartVideo   props, ,   ： ', props);
  return (
    <ReactPlayer
      url={props.src}
      playing
      width="100%"
      controls
      config={{
        file: {
          forceHLS: true,
        },
      }}
      {...props}
      className={`smartVideo ${props.className} `}
    />
  );
};

SmartVideo.defaultProps = {
  src:
    'http://hls01open.ys7.com/openlive/cc9073571e0c471ca4224debb3ac5eca.m3u8',
  // height: '100%',
  // width: '640',
};

SmartVideo.propTypes = {
  // 视频地址
  src: PropTypes.string,
  height: PropTypes.string,
  // 视频宽度
  width: PropTypes.string,
};

export default SmartVideo;
