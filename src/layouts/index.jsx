import React, { useState, useRef } from 'react';
import { Button, Descriptions, Result, Avatar, Layout } from 'antd';
import {
  UserOutlined,
  SearchOutlined,
  BellOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import ProLayout, {
  PageContainer,
  SettingDrawer,
  ProSettings,
} from '@ant-design/pro-layout';
import defaultProps from './defaultProps';
import { history } from 'umi';
import './style.less';
// import UserCenterForm from '../../components/FormCom/index'//

const { Header, Sider, Content } = Layout;

const content = (
  <Descriptions size="small" column={2}>
    <Descriptions.Item label="创建人">张三</Descriptions.Item>
    <Descriptions.Item label="创建人">张三</Descriptions.Item>
    <Descriptions.Item label="创建人">张三</Descriptions.Item>
    <Descriptions.Item label="创建人">张三</Descriptions.Item>
    <Descriptions.Item label="联系方式">
      <a>421421</a>
    </Descriptions.Item>
    <Descriptions.Item label="创建时间">2017-01-10</Descriptions.Item>
    <Descriptions.Item label="更新时间">2017-10-10</Descriptions.Item>
    <Descriptions.Item label="备注">
      中国浙江省杭州市西湖区古翠路
    </Descriptions.Item>
  </Descriptions>
);

export default props => {
  const [settings, setSetting] = useState(undefined);
  const comRef = useRef(() => <></>);
  const Com = comRef.current;
  const { children, location } = props; //
  const path = location.pathname;
  // const [pathname, setPathname] = useState('/welcome');
  const [pathname, setPathname] = useState(path);
  console.log(' settings, pathname ： ', settings, pathname, props); //

  // return <div >{ props.children }</div>

  return (
    <div
      id="test-pro-layout"
      style={
        {
          // transform: 'rotate(0)',
          // overflowX: 'hidden',
        }
      }
      className={'layoutContainer'}
    >
      <ProLayout
        {...defaultProps}
        style={
          {
            // maxHeight: '100vh',
          }
        }
        location={{
          pathname,
        }}
        onMenuHeaderClick={e => {
          console.log(' onMenuHeaderClick ： ', e); //

          // return
        }}
        menuItemRender={(item, dom) => {
          // console.log(' menuItemRender ： ', item, dom,    )//
          return (
            <a
              onClick={() => {
                console.log(' onClickonClick ： ', item, pathname); //
                // icon:    isMobile: false   isUrl: false   itemPath: "/户号管理"   key: "/户号管理"   locale: "menu.户号管理"   name: "户号管理"   onClick: ƒ onClick()   path: "/户号管理"   pro_layout_parentKeys: []   replace: false   routes: null
                // const com = React.lazy(() => import(item.component))
                // console.log(' com ： ', com, comRef.current, )//
                // comRef.current = com//
                setPathname(item.path || '/welcome');
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

        // logo={() => (
        //   <div>
        //     <SearchOutlined className={'m-r-10'}  />
        //     logo
        //   </div>
        // )}

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

        headerContentRender={() => (
          <div>
            <MenuFoldOutlined />
          </div>
        )}
        // pageTitleRender={() => (
        //   <div>
        //     pageTitleRender
        //   </div>
        // )}
        rightContentRender={() => (
          <div>
            {/* <Avatar shape="square" size="small" icon={<SearchOutlined />} />
            <Avatar shape="square" size="small" icon={<UserOutlined />} /> */}
            <SearchOutlined className={'m-r-10'} />
            <BellOutlined className={'m-r-10'} />
            <Avatar shape="square" size="small" icon={<UserOutlined />} />
          </div>
        )}
        {...settings}
      >
        <Content
          className="container "
          style={
            {
              // margin: '20px',
              // padding: '100px',
              // minHeight: '100px',
            }
          }
        >
          {/* <Com></Com> */}
          {/* <UserCenterForm></UserCenterForm> */}

          {children}
        </Content>

        {/* <PageContainer
          tabBarExtraContent={() => (
            <div>
              tabBarExtraContent
            </div>
          )}
          extraContent={() => (
            <div>
              extraContent
            </div>
          )}
          content={() => (
            <div>
              content
            </div>
          )}


          // content={content}
          // tabList={[
          //   {
          //     tab: '基本信息',
          //     key: 'base',
          //   },
          //   {
          //     tab: '详细信息',
          //     key: 'info',
          //   },
          // ]}
          // extra={[
          //   <Button key="4">操作4</Button>,
          //   <Button key="3">操作</Button>,
          //   <Button key="2">操作</Button>,
          //   <Button key="1" type="primary">
          //     主操作
          //   </Button>,
          // ]}
          // footer={[
          //   <Button key="4">重置4</Button>,
          //   <Button key="3">重置</Button>,
          //   <Button key="2" type="primary">
          //     提交
          //   </Button>,
          // ]}

        >

          
           需要抱过个容器 否则会报错 TypeError: react_redux_lib_default(...) is not a function 
          <div
            style={{
              // height: '120vh',
            }}
          >
            <Result
              status="404"
              style={{
                height: '100%',
                background: '#fff',
              }}
              title="Hello World"
              subTitle="Sorry, you are not authorized to access this page."
              extra={<Button type="primary">Back Home</Button>}
            />



          </div>




        </PageContainer> */}
      </ProLayout>

      <SettingDrawer
        getContainer={() => document.getElementById('test-pro-layout')}
        settings={settings}
        onSettingChange={changeSetting => setSetting(changeSetting)}
      />
    </div>
  );
};