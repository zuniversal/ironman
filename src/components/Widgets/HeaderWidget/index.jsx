import React, { useState } from 'react';
import './style.less';
import Icon from '@/components/Widgets/Icons';
import DropdownNotice from '@/components/Widgets/DropdownNotice';
// import DropdownNotice from '@/common/DropDownBtn';
import { LogoutOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { history, connect } from 'umi';
import { csSystemNotify, BIG_SCREEN } from '@/constants';
import {
  bussniessTabConfig,
  DEF_BUSSNIESS_TAB,
  isSmartOMS,
} from '@/configs/routes';
import { Tag, Tooltip } from 'antd';
const { CheckableTag } = Tag;

const BussniessTab = props => {
  // console.log(' BussniessTab   ,   ： ', props);
  // const [checkItem, setCheckItem] = useState(DEF_BUSSNIESS_TAB);
  const onChange = (item, checked) => {
    console.log(' BussniessTab onChange  ,   ： ', props, item, checked);
    // setCheckItem(item)
    props.onPlatformChange(item);
  };
  return isSmartOMS(props.platform) ? (
    bussniessTabConfig.map(v => (
      <CheckableTag
        key={v.value}
        // checked={checkItem === v.value}
        checked={props.platform === v.value}
        onChange={checked => {
          console.log(' onChange(v.value, checked) ： ', checked, v); //
          !v.disable && onChange(v.value, checked);
        }}
      >
        {v.label}
      </CheckableTag>
    ))
  ) : (
    <div></div>
  );
};

const HeaderWidget = props => {
  console.log(
    ' HeaderWidget   props, ,   ： ',
    props,
    props.userInfo?.perms?.screenModel,
  );
  const haveScreenAuth = props.userInfo?.perms?.screenModel?.perms?.module;
  const goBigScreen = path => {
    console.log(' goBigScreen   path,   ： ', path, BIG_SCREEN);
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

  const headerWidget = (
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
      {!props.isGuestMode && haveScreenAuth && (
        <span className="bigScreenWrapper actionItem dfc" onClick={goBigScreen}>
          <Icon icon={'bigScreen'} />
          <span className="text">大屏展示</span>
        </span>
      )}
      {avatar}
      {/* <span className="avatars" onClick={logout}></span> */}
      <span
        className={'actionItem userName '}
        onClick={() => goPage('/om/userCenter')}
      >
        {/* {props.userInfo.name} */}
        {props.userInfo.nickname}
      </span>
      <Tooltip placement="bottom" title={'退出登录'}>
        <LogoutOutlined onClick={props.logout} className={'actionItem  '} />
      </Tooltip>
      <Tooltip placement="bottom" title={'退出访客模式'}>
        {props.isGuestMode && (
          <UserSwitchOutlined
            onClick={props.logoutGuest}
            className={'actionItem  '}
          />
        )}
      </Tooltip>
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

  // return headerWidget
  return (
    <div className={`headers`}>
      <div className={`hederLeft`}>
        {/* hederLeft */}
        <BussniessTab
          platform={props.platform}
          onPlatformChange={props.onPlatformChange}
        ></BussniessTab>
      </div>
      {headerWidget}
    </div>
  );
};

export default HeaderWidget;
