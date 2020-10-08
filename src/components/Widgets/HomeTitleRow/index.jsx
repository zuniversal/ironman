import React from 'react';
import './style.less';
import { Form, Input } from 'antd';
import PageTitle from '@/components/Widgets/PageTitle'; //
import Icon from '@/components/Widgets/Icons'; //

const HomeSettingBtn = props => {
  return (
    <div className="settingWrapper" onClick={props.showSetting}>
      {/* <Icon icon={'setting'} ></Icon> */}
      <Icon icon={'home'} className={'setting'}></Icon>
      <div className="settingText">首页设置</div>
    </div>
  );
};

const HomeTitleRow = props => {
  return (
    <div className="homeTitleRow fsb ">
      <PageTitle {...props}></PageTitle>
      <HomeSettingBtn {...props}></HomeSettingBtn>
    </div>
  );
};

export default HomeTitleRow;
