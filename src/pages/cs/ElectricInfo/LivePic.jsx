import React from 'react';
import './style.less';
import { UploadOutlined } from '@ant-design/icons';

// <img src={v} src={'/dog.jpg'} className="livePic" key={i} />
const LivePic = props => {
  return (
    <div className="livePicWrapper">
      {Array(1)
        .fill('')
        .map((v, i) => (
          <UploadOutlined className="livePic" key={i} />
        ))}
    </div>
  );
};

LivePic.defaultProps = {};

export default LivePic;
