import React from 'react';
import './style.less';
import { Form, Input } from 'antd';
import PageTitle from '@/components/Widgets/PageTitle'; //

const HomeSettingBtn = props => {
  return (
    <div className="settingWrapper" onClick={props.showSetting}>
      <div className="settingText">首页设置</div>
    </div>
  );
};

const HomeTitleRow = props => {
  return (
    <div className="homeTitleRow fsb ">
      <PageTitle {...props}></PageTitle>
      <HomeSettingBtn></HomeSettingBtn>
    </div>
  );
};

export default HomeTitleRow;
