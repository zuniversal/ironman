import React from 'react';
import './style.less';
import Icon from '@/components/Widgets/Icons';
import DropdownNotice from '@/components/Widgets/DropdownNotice';
// import DropdownNotice from '@/common/DropDownBtn';
import { LogoutOutlined } from '@ant-design/icons'; //
import { history, connect } from 'umi';
import { csSystemNotify, BIG_SCREEN } from '@/constants'; //

const HeaderWidget = props => {
  // console.log(' HeaderWidget   props, ,   ： ', props);
  const goBigScreen = path => {
    console.log(' goBigScreen   path,   ： ', path);
    window.open(BIG_SCREEN);
    // window.open('http://188.131.235.243:31004/normal_screen');
  };
  const goPage = path => {
    console.log(' goPage   path,   ： ', path);
    history.push(path);
  };
  const menuClick = params => {
    // const path = `${csSystemNotify}${params.url}?id=${params.key}`
    const path = `${csSystemNotify}id=${params.key}`;
    console.log(' menuClick   params,   ： ', params);
    history.push(path);
  };

  const avatar = (
    <span className="avatars" onClick={() => goPage('/om/userCenter')}></span>
  );

  return (
    <div className="headerWidget dfc ">
      {/* <Icon icon={'search'} className={'actionItem '} /> */}
      <DropdownNotice
        avatar={avatar}
        menuClick={menuClick}
        userInfo={props.userInfo}
        userMsg={props.userMsg}
      >
        <Icon icon={'bell'} className={' '} />
      </DropdownNotice>
      <span className="yAxis actionItem"></span>
      <span className="bigScreenWrapper actionItem dfc" onClick={goBigScreen}>
        <Icon icon={'bigScreen'} />
        <span className="text">大屏展示</span>
      </span>
      {avatar}
      {/* <span className="avatars" onClick={logout}></span> */}
      <span
        className={'actionItem userName '}
        onClick={() => goPage('/om/userCenter')}
      >
        {/* {props.userInfo.name} */}
        {props.userInfo.nickname}
      </span>
      <LogoutOutlined onClick={props.logout} className={'actionItem  '} />
      {/* <span className="cs " onClick={() => goPage('/cs/csHome?type=test')}>CS</span> */}
      <span
        className="cs "
        onClick={() => {
          props.toggle();
          if (props.system == 'OM') {
            goPage('/cs/home');
          } else {
            goPage('/om/home');
          }
        }}
      >
        {/* {props.system === 'OM' ? 'CS' : 'OM'} */}
      </span>
    </div>
  );
};

export default HeaderWidget;
