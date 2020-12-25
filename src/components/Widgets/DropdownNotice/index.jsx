import React from 'react';
import './style.less';
import PropTypes from 'prop-types';
import { CloseOutlined } from '@ant-design/icons'; //
import { Menu, Dropdown, notification, Divider } from 'antd';
import { history, connect } from 'umi';
import SmartForm from '@/common/SmartForm'; //
import useWebsocket from '@/hooks/useWebsocket';
import { notifyWs } from '@/services/common';
// import { openNotification } from '@/utlis';

const menuConfig = [
  {
    key: 'upload',
    clickFn: 'showUploadModal',
    action: 'uploadFile',
    verb: '张明发来一条通知',
    description: '各单位注意，下午三点集体大厅开会',
    timestamp: '16分钟前',
  },
  {
    key: 'upload1',
    clickFn: 'showUploadModal',
    action: 'uploadFile',
    verb: '张明发来一条通知',
    description: '各单位注意，下午三点集体大厅开会',
    timestamp: '16分钟前',
  },
  {
    key: 'upload2',
    clickFn: 'showUploadModal',
    action: 'uploadFile',
    verb: '张明发来一条通知',
    description: '各单位注意，下午三点集体大厅开会',
    timestamp: '16分钟前',
  },
];

const DropdownNotice = props => {
  // console.log(' DropdownNotice ： ', props); //

  const {
    handleClick,
    children = '按钮',
    menu,
    menuConfig,
    menuClick,
    noEllipsis,
    avatar,
    userInfo,
  } = props; //

  const handleMenuClick = item => {
    console.log(' handleMenuClick   item, ,   ： ', item, props);
    const clickItem = menuConfig.find(v => v.key === item.key);
    console.log(' clickItem  menuConfig.find v ： ', clickItem);
    menuClick && menuClick({ ...clickItem, ...item });
  };

  // const Com = useWebsocket()
  const url = notifyWs + `?user_id=${userInfo.id}`;
  const { data } = useWebsocket({
    url,
    // url: 'ws://119.3.123.144:8008/websocket',
  });
  console.log(' useWebsocket data ： ', url, data); //

  const menuCom = menu ? (
    menu
  ) : (
    <Menu onClick={handleMenuClick} className={`dropdownContent`}>
      <Menu.Item key={'header'}>
        <div className="header divider">
          <div className="text">通知 ({props.count}) </div>
          <CloseOutlined className={`closeIcon`} onClick={props.closeNotice} />
        </div>
      </Menu.Item>
      {menuConfig.map((v, i) => (
        <Menu.Item key={v.key} action={v.action}>
          <div className="menuItem divider">
            <div className="left">
              <div className="avatar">
                <span className="avatars" onClick={() => {}}></span>
              </div>
            </div>
            <div className="right">
              <div className="title subText ">{v.verb}</div>
              <div className="content ellipsis">{v.description}</div>
              <div className="time subText">{v.timestamp}</div>
            </div>
          </div>
        </Menu.Item>
      ))}
      <Menu.Item key={'footer'}>
        <div className="footer">
          <div className="clearText" onClick={props.clearNotice}>
            清空通知
          </div>
        </div>
      </Menu.Item>
    </Menu>
  );

  // return <div>ssssss</div>
  return (
    <Dropdown
      overlay={menuCom}
      className={`dropdownNotice`}
      overlayClassName={`dropdownNotice`}
    >
      {children}
    </Dropdown>
  );
};

DropdownNotice.defaultProps = {
  count: 6,
  placeholder: '按钮',
  noEllipsis: false,
  menuConfig: [],
  menuConfig: menuConfig,
  menuClick: () => {},
  closeNotice: () => {},
  clearNotice: () => {},
};

DropdownNotice.propTypes = {
  // noEllipsis: PropTypes.bool,
  // menuConfig: propTypes.array,
  // menuClick: PropTypes.func,
};

export default DropdownNotice;
