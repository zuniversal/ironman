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
import { DownOutlined, EllipsisOutlined,    } from '@ant-design/icons';

const DropDownBtn = props => {
  console.log(' DropDownBtn ： ', props, ); //

  const { handleClick, btnProps, children = '按钮', menu, menuConfig, menuClick, noEllipsis,    } = props; //

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
      <Button type="primary" {...btnProps} className='dropBtn'  >
        {children}{!noEllipsis ? <><span className="yAxis">|</span><EllipsisOutlined /></> : null}
      </Button>
    </Dropdown>
  );
};

DropDownBtn.defaultProps = {
  menuConfig: [],
};

export default DropDownBtn;
