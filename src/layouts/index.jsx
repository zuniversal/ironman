import React, { useState, useRef, Suspense } from 'react';
import { Button, Descriptions, Result, Avatar, Layout, Spin } from 'antd';
import {
  UserOutline1d,
  SearchOutlined,
  BellOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import ProLayout, {
  PageContainer,
  SettingDrawer,
  ProSettings,
} from '@ant-design/pro-layout';
import defaultProps from './defaultProps';
import { history, connect } from 'umi';
import './index.less';
import './style.less';
import { ANIMATE } from '@/constants'; //
import Icon from '@/components/Widgets/Icons'; //
import PageTitle from '@/components/Widgets/PageTitle'; //
import LogoCom from '@/components/Widgets/LogoCom'; //
import { actions } from '@/models/layout'; //
// import Icon from '@Widgets/Icons'//
// import Icon from 'widgets/Icons'//
// import UserCenterForm from '../../components/FormCom/index'//

// // import { login,  } from '@/services/user'//
// import axios from 'axios'; //
// const haveToken = localStorage.getItem('token');
// console.log('  haveToken ：', haveToken); //
// console.log('  对吗  !haveToken ', !haveToken);
// if (!haveToken) {
//   const res = axios
//     .post('/api/v1/login', { username: 'admin', password: 'afafa' })
//     // .delete('/api/v1/console/equipment', { ids: [] })
//     .then(res => {
//       console.log('  login  ： ', res);
//       localStorage.setItem('token', res.data.token);
//     });
// }

const { Header, Sider, Content } = Layout;

const Layouts = props => {
  const [settings, setSetting] = useState(undefined);
  const [title, setTitle] = useState('');
  const comRef = useRef(() => <></>);
  const Com = comRef.current;
  const { children, location, loading } = props; //
  const path = location.pathname;
  // const [pathname, setPathname] = useState('/welcome');
  const [pathname, setPathname] = useState(path);
  console.log(' settings, pathname ： ', settings, pathname, props); //
  // return <div >{ props.children }</div>

  const goPage = path => {
    console.log(' goPage   path,   ： ', path);
    history.push(path);
  };

  // const getShowTitle = props => {
  //   const { location } = props; //
  //   const { pathname } = location;
  //   const noTitlePath = ['/om/home', '/om/shiftsArrangeDetail'];
  //   const isInclude = noTitlePath.every(v => v !== pathname);
  //   console.log(' isInclude some  ： ', props, isInclude, pathname);
  //   return isInclude;
  // };
  // const isShowTitle = getShowTitle(props);

  return (
    <div id="test-pro-layout" className={'layoutContainer'}>
      <ProLayout
        {...defaultProps}
        location={{
          pathname: path,
        }}
        onPageChange={e => {
          console.log(' onPageChange 切换页面 ： ', e); //

          // return
        }}
        onMenuHeaderClick={e => {
          console.log(' onMenuHeaderClick ： ', e); //

          // return
        }}
        menuItemRender={(item, dom) => {
          //console.log(' menuItemRender ： ', item, dom, pathname,   )

          // 调用 报错
          // devScripts.js:5836 Warning: Cannot update a component (`Unknown`) while rendering a different
          // component (`BaseMenu`). To locate the bad setState() call inside `BaseMenu`,
          if (item.path === path) {
            // console.log(
            //   ' 路径相同 ： ',
            //   item,
            //   item.path === path,
            //   item.path,
            //   path,
            // ); //
            // setTitle(item.name)
            // props.dispatch(actions.setTitle(item.name));
            // setTimeout(() => setTitle(item.name), 0);
          }
          if (item.notShowItem) {
            return null;
          }

          return (
            <a
              className={'navItem'}
              onClick={() => {
                console.log(' onClickonClick ： ', item, pathname); //
                // icon:    isMobile: false   isUrl: false   itemPath: "/户号管理"   key: "/户号管理"   locale: "menu.户号管理"   name: "户号管理"   onClick: ƒ onClick()   path: "/户号管理"   pro_layout_parentKeys: []   replace: false   propss: null
                // const com = React.lazy(() => import(item.component))
                // console.log(' com ： ', com, comRef.current, )//
                // comRef.current = com//
                // setPathname(item.path || '/welcome');
                // setTitle(item.name)
                // props.dispatch(actions.setTitle(item.name));
                history.push(item.path);
              }}
            >
              {dom}
            </a>
          );
        }}
        // Warning: pro-layout: renderPageTitle return value should be a string
        // title={() => (
        //   <div>
        //     <SearchOutlined className={'m-r-10'}  />
        //     title
        //   </div>
        // )}

        logo={() => <LogoCom className={`logoClass`}></LogoCom>}
        // Warning: pro-layout: renderPageTitle return value should be a string
        // headerTitleRender={() => (
        //   <div>
        //     <MenuFoldOutlined />

        //   </div>
        // )}

        // 会导致 导航栏 变黑色
        // headerRender={() => (
        //   <div>
        //     headerRender

        //   </div>
        // )}

        // 导航栏 左渲染
        // headerContentRender={() => (
        //   <div>
        //     <MenuFoldOutlined />
        //   </div>
        // )}

        // pageTitleRender={() => (
        //   <div>
        //     pageTitleRender
        //   </div>
        // )}
        rightContentRender={() => (
          <div className={'dfc'}>
            {/* <Avatar shape="square" size="small" icon={<SearchOutlined />} />
              <Avatar shape="square" size="small" icon={<UserOutlined />} /> */}
            {/* <SearchOutlined className={'actionItem '} /> */}
            {/* <BellOutlined className={'actionItem '} /> */}
            <Icon icon={'search'} className={'actionItem '} />
            <Icon icon={'bell'} className={'actionItem '} />
            <span className="avatars"></span>
            {/* <Avatar
              className={'actionItem'}
              shape="square"
              size="small"
              // icon={<UserOutlined />}
              onClick={() => goPage('/cs/userCenter')}
            /> */}
            <span className={'actionItem userName '}>用户名</span>
          </div>
        )}
        // title={'POWERKEEPER'}
        title={''}
        // logo={null}
        siderWidth={200}
        {...settings}
      >
        <Suspense fallback={null}>
          <Spin spinning={loading} spinning={false} className={'spinWrapper'}>
            <Content
              key={pathname}
              // className={`${ANIMATE.flash} container `}
              className={` container `}
              style={
                {
                  // margin: '20px',
                  // padding: '100px',
                  // minHeight: '100px',
                }
              }
            >
              {/* <div className="titleWrapper">
                <div className="pageTitle">{title}</div>
              </div> */}

              {/* <PageTitle
                {...props}
                title={title}
                className="titleWrapper"
              ></PageTitle> */}

              {/* <Com></Com> */}
              {/* <UserCenterForm></UserCenterForm> */}

              <div className="content">{children}</div>
            </Content>
          </Spin>
        </Suspense>
      </ProLayout>

      <SettingDrawer
        getContainer={() => document.getElementById('test-pro-layout')}
        settings={settings}
        onSettingChange={changeSetting => setSetting(changeSetting)}
      />
    </div>
  );
};

const mapStateToProps = ({ loading }) => ({ loading: loading.global });

export default connect(mapStateToProps)(Layouts);
