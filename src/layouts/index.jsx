import React, { useState, useRef, Suspense } from 'react';
import { Layout, Spin } from 'antd';
import ProLayout, {
  PageContainer,
  SettingDrawer,
} from '@ant-design/pro-layout';
import defaultProps, {
  managerRoutes,
  customerRoutes,
  csRoutes,
} from '@/configs/routes';
import { history, connect } from 'umi';
import './index.less';
import './style.less';
import { ANIMATE, CS_SYSTEM } from '@/constants';
import LogoCom from '@/components/Widgets/LogoCom';
import HeaderWidget from '@/components/Widgets/HeaderWidget';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { LogoutOutlined, SwapOutlined } from '@ant-design/icons';
import SearchForm from '@/common/SearchForm';
import { platformSelectConfig, plaformFormat } from '@/configs/routes';
import { tips, getItems } from '@/utils';

const { Header, Sider, Content } = Layout;

const Layouts = props => {
  const [collapsed, setCollapsed] = useState(false);
  const [settings, setSetting] = useState(undefined);
  const comRef = useRef(() => <></>);
  const Com = comRef.current;
  const {
    children,
    location,
    loading,
    userInfo,
    guestInfo,
    isGuestMode,
    system,
    accountType,
    getRoutes,
    userMsg,
    platform,
    isNotice,
    authInfo,
  } = props;
  const path = location.pathname;
  const [pathname, setPathname] = useState(path);
  console.log(
    ' %c Layouts 组件 props ： ',
    `color: #333; font-weight: bold`,
    props,
  ); //

  const onPlatformChange = (platform, item) => {
    console.log(
      ' onPlatform, itemChange   ,   ： ',
      platform,
      item,
      props,
      authInfo,
      platformSelectConfig,
    );
    const { authKey } = platformSelectConfig.find(v => v.value === platform);
    console.log(' onPlatform authKey ： ', authKey, authInfo[authKey]); //
    // if (authInfo[authKey].module) {
    props.dispatch({
      type: 'user/onPlatformChange',
      payload: { platform },
    });
    tips('平台切换成功！');
    // } else {
    //   tips('没有该平台的相关权限！', 2);
    // }
  };

  const menuHeaderRender = () => (
    <div className={`menuHeaderWrapper`}>
      {/* <div className={`logoWrapper dfc`}>
        <LogoCom className={`logoClass`}></LogoCom>
      </div> */}
      <div className={`logoWrapper dfc`}>
        {system != CS_SYSTEM && !collapsed && (
          <SearchForm
            suffixIcon={<SwapOutlined />}
            selectData={platformSelectConfig}
            placeholder={'请选择平台'}
            value={plaformFormat(platform)}
            onChange={onPlatformChange}
            disabled={system == CS_SYSTEM}
          ></SearchForm>
        )}
      </div>
    </div>
  );

  const logout = path => {
    console.log(' logout   path,   ： ', path);
    props.dispatch({
      type: 'user/logoutAsync',
    });
  };

  const logoutGuest = path => {
    console.log(' logoutGuest   path,   ： ', path);
    props.dispatch({
      type: 'user/logoutGuestAsync',
    });
  };

  const toggle = path => {
    console.log(' toggle   path,   ： ', path);
    props.dispatch({
      type: 'user/toggle',
    });
  };

  const clearNotice = path => {
    console.log(' clearNotice   path,   ： ', path);
    props.dispatch({
      type: 'user/readAllMsgAsync',
    });
  };

  const readMsgAsync = payload => {
    console.log(' readMsgAsync   payload,   ： ', payload);
    props.dispatch({
      type: 'user/readMsgAsync',
      payload,
    });
  };

  const onNoticeChange = payload => {
    console.log(' onNoticeChange   payload,   ： ', payload);
    props.dispatch({
      type: 'user/onNoticeChange',
      payload,
    });
  };

  return (
    <ErrorBoundary>
      <div className={'layoutContainer'}>
        <ProLayout
          {...(system == 'CS' ? csRoutes : getRoutes)}
          onCollapse={setCollapsed}
          collapsed={collapsed}
          location={{
            pathname: path,
          }}
          menu={{ defaultOpenAll: true }}
          menuItemRender={(item, dom) => {
            if (item.notShowItem) {
              return null;
            }
            return (
              <a
                className={'navItem'}
                onClick={() => {
                  console.log(' onClickonClick ： ', item, pathname);
                  history.push(item.path);
                }}
              >
                {dom}
              </a>
            );
          }}
          className={'spinWrapperinWrap'}
          logo={() => <LogoCom className={`logoClass`}></LogoCom>}
          rightContentRender={() => (
            <HeaderWidget
              userInfo={isGuestMode ? guestInfo : userInfo}
              isGuestMode={isGuestMode}
              system={system}
              logout={logout}
              logoutGuest={logoutGuest}
              toggle={toggle}
              userMsg={userMsg}
              platform={platform}
              onPlatformChange={onPlatformChange}
              clearNotice={clearNotice}
              menuClick={readMsgAsync}
              isNotice={isNotice}
              onNoticeChange={onNoticeChange}
            ></HeaderWidget>
          )}
          menuHeaderRender={menuHeaderRender}
          // menuExtraRender={({ collapsed }) => {
          //   console.log('  menuExtraRender ：', );
          //   return !collapsed && (
          //     <SearchForm
          //       suffixIcon={<SwapOutlined />}
          //       selectData={platformSelectConfig}
          //       placeholder={'请选择平台'}
          //     ></SearchForm>
          //   )
          // }}
          siderWidth={200}
          title={''}
          {...settings}
        >
          <Suspense fallback={null} className={''}>
            {/* <Spin spinning={loading} spinning={false} className={'spinWrapper'}> */}
            <Content key={pathname} className={` container `}>
              <div className="content">{children}</div>
            </Content>
            {/* </Spin> */}
          </Suspense>
        </ProLayout>

        {/* <SettingDrawer
          getContainer={() => document.getElementById('test-pro-layout')}
          settings={settings}
          onSettingChange={changeSetting => setSetting(changeSetting)}
        /> */}
      </div>
    </ErrorBoundary>
  );
};

const mapStateToProps = ({ loading, user }) => ({
  loading: loading.global,
  userInfo: user.userInfo,
  guestInfo: user.guestInfo,
  isGuestMode: user.isGuestMode,
  system: user.system,
  platform: user.platform,
  accountType: user.accountType,
  getRoutes: user.getRoutes,
  userMsg: user.userMsg,
  isNotice: user.isNotice,
  authInfo: user.authInfo,
});

export default connect(mapStateToProps)(Layouts);
