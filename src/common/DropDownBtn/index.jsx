import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './style.less';
import {
  Table,
  Icon,
  notification,
  Modal,
  Button,
  Tag,
  Form,
  Input,
  Row,
  Col,
  Menu,
  Dropdown,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';

const DropDownBtn = props => {
  console.log(' DropDownBtn ： ', props, ); //

  const { handleClick, btnProps, children = '按钮', menu, menuConfig, menuClick,    } = props; //

  const handleMenuClick = (item, ) => {
    console.log(' handleMenuClick   item, ,   ： ', item, props,   );
    
    menuClick && menuClick({ ...item,  });
  };

  const menuCom = menu ? (
    menu
  ) : (
    <Menu onClick={handleMenuClick}>
      {menuConfig.map((v, i) => (
        <Menu.Item key={v.key}>{v.text}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menuCom}>
      <Button type="primary" {...btnProps}>
        {children}
      </Button>
    </Dropdown>
  );
};

DropDownBtn.defaultProps = {
  menuConfig: [],
};

export default DropDownBtn;
