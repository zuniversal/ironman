import React from 'react';
import './style.less';
import QRCode from 'qrcode.react';

const QRCodeCom = props => {
  const {
    value = 'zyb',
    children = '按钮',
    width = 260,
    height = 260,
    size = 260,
  } = props;
  console.log(' QRCodeCom ： ', props);
  let str = value;
  if (typeof value === 'object') {
    str = JSON.stringify(value);
    // str = JSON.stringify(`http://zuniversal.gitee.io/ep/#/om/contract`);
  }
  console.log(' str ： ', str);
  return (
    <div className={'qrCode'}>
      <QRCode
        width={width}
        height={height}
        {...props}
        value={str}
        size={size}
        // imageSettings={{
        //   width: 260,
        //   height: 260,
        // }}
        id="qrCode"
      />
    </div>
  );
};

QRCodeCom.defaultProps = {
  value: '按钮',
  width: 260,
  height: 260,
  size: 260,
};

export default QRCodeCom;
