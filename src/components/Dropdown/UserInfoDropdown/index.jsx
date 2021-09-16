import React from 'react';
import { Menu, Dropdown, } from 'antd';

const UserInfoDropdown = props => {
  const {
    children = '按钮',
    menu,
    config,
    menuClick,
  } = props;

  const handleMenuClick = (item, data) => {
    console.log(' handleMenuClick   item, ,   ： ', item, data, props);
    const clickItem = config.find(v => v.key === item.key);
    console.log(
      ' clickItem  config.find v ： ',
      config,
      clickItem,
      item,
      { ...clickItem, data, ...item },
    );
    menuClick && menuClick({ ...clickItem, data, ...item });
  };

  const menuCom = menu ? (
    menu
  ) : (
    <Menu className={`dropdownContent`}>
      {config.map((v, i) => (
        <Menu.Item
          action={v.action}
          onClick={e => handleMenuClick(e, v)}
          key={v.key}
        >
          <div className="menuItem divider">
            <div className="title  ">{v.label}</div>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown
      overlay={!!config.length ? menuCom : <div></div>}
      className={`userInfoDropdown`}
      overlayClassName={`userInfoDropdown`}
      // placement={'bottomRight'}
    >
      {children}
    </Dropdown>
  );
};

UserInfoDropdown.defaultProps = {
  count: 6,
  placeholder: '按钮',
  noEllipsis: false,
  config: [],
  menuClick: () => {},
  closeNotice: () => {},
  clearNotice: () => {},
};

UserInfoDropdown.propTypes = {};

export default UserInfoDropdown;
