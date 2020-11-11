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
      <span className="yAxis actionItem">|</span>
      <Icon icon={'bigScreen'} />
      <span className="bigScreen actionItem">大屏展示</span>
      <span className="avatars" onClick={() => goPage('/om/userCenter')}></span>
      {/* <span className="avatars" onClick={logout}></span> */}
      <span
        className={'actionItem userName '}
        onClick={() => goPage('/om/userCenter')}
      >
        {/* {props.userInfo.name} */}
        {props.userInfo.nickname}
      </span>
      {/* <span className="cs " onClick={() => goPage('/cs/csHome?type=test')}>CS</span> */}
      <span
        className="cs "
        onClick={() => {
          props.toggle();
          if (props.system == 'OM') {
            goPage('/cs/csHome');
          } else {
            goPage('/om/home');
          }
        }}
      >
        {props.system === 'OM' ? 'CS' : 'OM'}
      </span>
    </div>
  );
};

export default HeaderWidget;
