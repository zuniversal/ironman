import React from 'react';
import './style.less';

const LivePic = props => {
  return (
    <div className="livePicWrapper">
      {Array(4)
        .fill('')
        .map((v, i) => (
          <img src={v} src={'/dog.jpg'} className="livePic" key={i} />
        ))}
    </div>
  );
};

LivePic.defaultProps = {};

export default LivePic;
