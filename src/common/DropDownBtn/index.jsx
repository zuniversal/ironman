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
  const [form] = Form.useForm();
  console.log(' DropDownBtn ： ', props, form); //

  const { handleClick, btnProps, children = '按钮', menu, menuConfig } = props; //

  const handleMenuClick = e => {
    console.log(' handleMenuClick   e, ,   ： ', e);
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
