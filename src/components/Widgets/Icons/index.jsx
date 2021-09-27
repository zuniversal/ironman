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
import Icon from '@ant-design/icons';
import dog from '@/static/img/dog.jpg';
import logo from '@/static/img/logo.png';
import bell from '@/static/img/bell.png';
import search from '@/static/img/search.png';
import ok from '@/static/img/ok.png';
import close from '@/static/img/close.png';
import warning from '@/static/img/warning.png';
import bigScreen from '@/static/img/bigScreen.png';
import miniPower from '@/static/img/miniPower.png';
import setting from '@/static/img/setting.png';
import powerStatus from '@/static/img/powerStatus.png';

// import * as Imgs from '@/static/img'//

import bussniessRecord from '@/static/sideBarIcon/cs/bussniessRecord.png';
import csClientReport from '@/static/sideBarIcon/cs/csClientReport.png';
import csHome from '@/static/sideBarIcon/cs/csHome.png';
import csInspectRecord from '@/static/sideBarIcon/cs/csInspectRecord.png';
import csOrganize from '@/static/sideBarIcon/cs/csOrganize.png';
import csUserCenter from '@/static/sideBarIcon/cs/csUserCenter.png';
import msgList from '@/static/sideBarIcon/cs/msgList.png';

import alarmManage from '@/static/sideBarIcon/om/alarmManage.png';
import bussniessManage from '@/static/sideBarIcon/om/bussniessManage.png';
import clientInfoManage from '@/static/sideBarIcon/om/clientInfoManage.png';
import customerManage from '@/static/sideBarIcon/om/customerManage.png';
import home from '@/static/sideBarIcon/om/home.png';
import inspect from '@/static/sideBarIcon/om/inspect.png';
import kpiManage from '@/static/sideBarIcon/om/kpiManage.png';
import shiftsManage from '@/static/sideBarIcon/om/shiftsManage.png';
import systemManage from '@/static/sideBarIcon/om/systemManage.png';

import csMonitorCPU from '@/static/assets/csMonitorCPU.png';
import csMonitorRAM from '@/static/assets/csMonitorRAM.png';
import csMonitorMemory from '@/static/assets/csMonitorMemory.png';
import csMonitorNetwork from '@/static/assets/csMonitorNetwork.png';

// import home from '@/static/sideBarIcon/home.png';
// import csOrganize from '@/static/sideBarIcon/csOrganize.png';
// import csUserCenter from '@/static/sideBarIcon/csUserCenter.png';
// import shifts from '@/static/sideBarIcon/shifts.png';
// import contract from '@/static/sideBarIcon/contract.png';
// import client from '@/static/sideBarIcon/client.png';
// import houseNo from '@/static/sideBarIcon/houseNo.png';
import powerStation from '@/static/sideBarIcon/powerStation.png';
// import assets from '@/static/sideBarIcon/assets.png';
// // import monitorManage from '@/static/sideBarIcon/monitorManage.png'
// import goods from '@/static/sideBarIcon/goods.png';
// import missionsManage from '@/static/sideBarIcon/missionsManage.png';
// import workOrder from '@/static/sideBarIcon/workOrder.png';
// // import operation from '@/static/sideBarIcon/operation.png'
// import alarm from '@/static/sideBarIcon/alarm.png';
// import userManage from '@/static/sideBarIcon/userManage.png';
// import role from '@/static/sideBarIcon/role.png';
// import organize from '@/static/sideBarIcon/organize.png';
// import msg from '@/static/sideBarIcon/msg.png';
// import dict from '@/static/sideBarIcon/dict.png';
// import csMonitor from '@/static/sideBarIcon/csMonitor.png';
// import operateRecord from '@/static/sideBarIcon/operateRecord.png';
// import kpi from '@/static/sideBarIcon/kpi.png';

import clientManage from '@/static/sideBarIcon/crm/clientManage.png';
import salesManage from '@/static/sideBarIcon/crm/salesManage.png';
import satisAnalyse from '@/static/sideBarIcon/crm/satisAnalyse.png';
import taskManage from '@/static/sideBarIcon/crm/taskManage.png';

const iconMap = {
  dog,
  logo,
  bell,
  search,
  ok,
  close,
  warning,
  bigScreen,
  miniPower,
  setting,
  powerStatus,

  bussniessRecord,
  csClientReport,
  csHome,
  csInspectRecord,
  csOrganize,
  csUserCenter,
  msgList,

  alarmManage,
  bussniessManage,
  clientInfoManage,
  customerManage,
  home,
  inspect,
  kpiManage,
  shiftsManage,
  systemManage,

  csMonitorCPU,
  csMonitorRAM,
  csMonitorMemory,
  csMonitorNetwork,

  // home,
  // csOrganize,
  // csUserCenter,
  // shifts,
  // contract,
  // client,
  // houseNo,
  powerStation,
  // assets,
  // // monitorManage,
  // goods,
  // missionsManage,
  // workOrder,
  // // operation,
  // alarm,
  // userManage,
  // role,
  // organize,
  // msg,
  // dict,
  // csMonitor,
  // operateRecord,
  // kpi,

  clientManage,
  salesManage,
  satisAnalyse,
  taskManage,
};

export const Bell = props => {
  console.log(' Bell   props, ,   ： ', props);
  return <img src={bell} {...props} />;
};

const Icons = props => {
  // console.log(' Icon   props, ,   ： ', props,   )
  const { icon = 'bell', className } = props;

  const HeartSvg = () => (
    <img
      src={iconMap[icon]}
      {...props}
      className={`${icon} icons ${className}  `}
    />
  );
  // return null//
  return (
    // <img
    //   src={iconMap[icon]}
    //   {...props}
    //   className={`${icon} icons ${className}  `}
    // />
    <Icon component={HeartSvg} {...props} />
  );
};

Icons.defaultProps = {
  className: '',
};

Icons.propTypes = {
  className: PropTypes.string,
};

export default Icons;
