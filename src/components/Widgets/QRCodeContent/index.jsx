import React from 'react';
import './style.less';
import { Button } from 'antd';
import QRCodeCom from '@/common/QRCodeCom'; //
import { downLoadFile, tips } from '@/utils'; //

const QRCodeContent = props => {
  const downLoadRef = React.createRef();
  console.log(' QRCodeContent   props, ,   ： ', props, downLoadRef);
  return (
    <div className="qrcodeWrapper">
      <div className="title">M101进线柜</div>
      <QRCodeCom value={props.record}></QRCodeCom>
      <div className="btnWrapper">
        <Button>
          <a
            ref={downLoadRef}
            onClick={() =>
              downLoadFile(downLoadRef.current, { downEle: 'qrCode' })
            }
          >
            下载
          </a>
        </Button>
        <Button>
          <a onClick={() => tips('暂未实现！')}>打印</a>
        </Button>
      </div>
    </div>
  );
};

export default QRCodeContent;
