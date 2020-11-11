import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Radio,
  Space,
  InputNumber,
  Upload,
  Result,
} from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';

import logo from '@/static/img/logo.png'; //
import bell from '@/static/img/bell.png'; //
import search from '@/static/img/search.png'; //
import ok from '@/static/img/ok.png'; //
import close from '@/static/img/close.png'; //
import warning from '@/static/img/warning.png'; //
import bigScreen from '@/static/img/bigScreen.png'; //

// import * as Imgs from '@/static/img'//

import home from '@/static/sideBarIcon/home.png';
import csOrganize from '@/static/sideBarIcon/csOrganize.png';
import csUserCenter from '@/static/sideBarIcon/csUserCenter.png';
import shifts from '@/static/sideBarIcon/shifts.png';
import contract from '@/static/sideBarIcon/contract.png';
import client from '@/static/sideBarIcon/client.png';
import houseNo from '@/static/sideBarIcon/houseNo.png';
import powerStation from '@/static/sideBarIcon/powerStation.png';
import assets from '@/static/sideBarIcon/assets.png';
// import monitorManage from '@/static/sideBarIcon/monitorManage.png'
import goods from '@/static/sideBarIcon/goods.png';
import missionsManage from '@/static/sideBarIcon/missionsManage.png';
import workOrder from '@/static/sideBarIcon/workOrder.png';
// import operation from '@/static/sideBarIcon/operation.png'
import alarm from '@/static/sideBarIcon/alarm.png';
import userManage from '@/static/sideBarIcon/userManage.png';
import role from '@/static/sideBarIcon/role.png';
import organize from '@/static/sideBarIcon/organize.png';
import msg from '@/static/sideBarIcon/msg.png';
import dict from '@/static/sideBarIcon/dict.png';
import csMonitor from '@/static/sideBarIcon/csMonitor.png';
import operateRecord from '@/static/sideBarIcon/operateRecord.png';
import kpi from '@/static/sideBarIcon/kpi.png';

const iconMap = {
  logo,
  bell,
  search,
  ok,
  close,
  warning,
  bigScreen,

  home,
  csOrganize,
  csUserCenter,
  shifts,
  contract,
  client,
  houseNo,
  powerStation,
  assets,
  // monitorManage,
  goods,
  missionsManage,
  workOrder,
  // operation,
  alarm,
  userManage,
  role,
  organize,
  msg,
  dict,
  csMonitor,
  operateRecord,
  kpi,
};

export const Bell = props => {
  console.log(' Bell   props, ,   ： ', props);
  return <img src={bell} {...props} />;
};

const Icon = props => {
  // console.log(' Icon   props, ,   ： ', props,   )
  const { icon = 'bell', className } = props;
  return (
    <img
      src={iconMap[icon]}
      {...props}
      className={`${icon} icons ${className}  `}
    />
  );
};

Icon.defaultProps = {
  className: '',
};

Icon.propTypes = {
  className: PropTypes.string,
};

export default Icon; //
