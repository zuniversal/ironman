import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { Button, Menu, Dropdown } from 'antd';
import { DownOutlined, EllipsisOutlined } from '@ant-design/icons';
import { BASE_URL } from '@/constants';

const DropDownBtn = props => {
  // console.log(' DropDownBtn ： ', props);

  const {
    handleClick,
    btnProps,
    children = '按钮',
    menu,
    menuConfig,
    menuClick,
    noEllipsis,
  } = props;

  const handleMenuClick = item => {
    console.log(' handleMenuClick   item, ,   ： ', item, props);
    const clickItem = menuConfig.find(v => v.key === item.key);
    console.log(' clickItem  menuConfig.find v ： ', clickItem);
    menuClick && menuClick({ ...clickItem, ...item });
  };

  // v.type === 'down'
  const menuCom = menu ? (
    menu
  ) : (
    <Menu onClick={handleMenuClick}>
      {menuConfig.map((v, i) =>
        v.downFile ? (
          <Menu.Item key={v.key} action={v.action}>
            <a id="down" href={`${BASE_URL + v.downFile}`} download="zyb">
              {v.text}
            </a>
          </Menu.Item>
        ) : (
          <Menu.Item key={v.key} action={v.action}>
            {v.text}
          </Menu.Item>
        ),
      )}
    </Menu>
  );

  return (
    <Dropdown overlay={menuCom}>
      <Button type="primary" {...btnProps} className="dropBtn">
        {children}
        {!noEllipsis ? (
          <>
            <span className="yAxis">|</span>
            <EllipsisOutlined />
          </>
        ) : null}
      </Button>
    </Dropdown>
  );
};

DropDownBtn.defaultProps = {
  placeholder: '按钮',
  noEllipsis: false,
  menuConfig: [],
  menuClick: () => {},
};

DropDownBtn.propTypes = {
  noEllipsis: PropTypes.bool,
  menuConfig: PropTypes.array,
  menuClick: PropTypes.func,
};

export default DropDownBtn;
