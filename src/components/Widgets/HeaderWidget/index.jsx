import React from 'react';
import './style.less';
import Icon from '@/components/Widgets/Icons'; //
import { history, connect } from 'umi';

const HeaderWidget = props => {
  console.log(' HeaderWidget   props, ,   ： ', props);
  const goPage = path => {
    console.log(' goPage   path,   ： ', path);
    history.push(path);
  };
  return (
    <div className="headerWidget dfc ">
      {/* <Icon icon={'search'} className={'actionItem '} /> */}
      <Icon icon={'bell'} className={'actionItem '} />
      <span className="avatars" onClick={() => goPage('/om/userCenter')}></span>
      <span
        className={'actionItem userName '}
        onClick={() => goPage('/om/userCenter')}
      >
        {/* {props.userInfo.name} */}
        {props.userInfo.nickname}
      </span>
    </div>
  );
};

export default HeaderWidget;
