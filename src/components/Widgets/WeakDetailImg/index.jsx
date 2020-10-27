import React from 'react';
import './style.less';

const WeakDetailImg = props => {
  // console.log(' WeakDetailImg   props, ,   ： ', props);
  return props.src ? (
    <img className={'detailImg'} src={props.src} {...props} />
  ) : (
    <div className={'detailImg'}>此处为图片</div>
  );
};

export default WeakDetailImg; //
