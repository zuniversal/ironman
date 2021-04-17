import React from 'react';
import './style.less';
import Icon from '@/components/Widgets/Icons';

const WeakDetailImg = props => {
  // console.log(' WeakDetailImg   props, ,   ： ', props);
  return props.src ? (
    <img className={'detailImg'} src={props.src} {...props} />
  ) : (
    // <div className={'detailImg'}>此处为图片</div>
    <Icon icon={'dog'} className={`detailImg ${props.className}`}></Icon>
  );
};

WeakDetailImg.defaultProps = {
  // src:
};

export default WeakDetailImg;
