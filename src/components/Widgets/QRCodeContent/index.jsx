import React from 'react';
import './style.less';
import { Button } from 'antd';
import QRCodeCom from '@/common/QRCodeCom'; //

const QRCodeContent = props => {
  console.log(' QRCodeContent   props, ,   ： ', props);
  return (
    <div className="qrcodeWrapper">
      <div className="title">M101进线柜</div>
      <QRCodeCom value={props.record}></QRCodeCom>
      <div className="btnWrapper">
        <Button onClick={() => {}}>下载</Button>
        <Button onClick={() => {}}>打印</Button>
      </div>
    </div>
  );
};

export default QRCodeContent;
