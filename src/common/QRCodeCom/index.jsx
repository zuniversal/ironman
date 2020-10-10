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

import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';

const QRCodeCom = props => {
  console.log(' QRCodeCom ： ', props); //

  const { value = 'zyb', children = '按钮', width, height, } = props; //
  let str = value;
  if (typeof value === 'object') {
    str = JSON.stringify(value);
    // str = JSON.stringify(`http://zuniversal.gitee.io/ep/#/om/contract`);
  }
  console.log(' str ： ', str); //
  return <QRCode width={width} height={height} {...props} value={str} id="qrCode" />;
};

QRCodeCom.defaultProps = {
  value: '按钮',
  width: '260px',
  height: '260px',
};

QRCodeCom.propTypes = {
  // value: PropTypes.string,
};

export default QRCodeCom;
