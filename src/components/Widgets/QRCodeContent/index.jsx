import React, { useState } from 'react';
import './style.less';
import { Button } from 'antd';
import QRCodeCom from '@/common/QRCodeCom'; //
import { downLoadFile, tips } from '@/utils'; //
import ExportPdf from '@/components/Pdf/ExportPdf';

const QRCodeContent = props => {
  const downLoadRef = React.createRef();
  const [isShowExportPdf, setIsShowExportPdf] = useState(false);
  console.log(
    ' QRCodeContent   props, ,   ： ',
    props,
    downLoadRef,
    isShowExportPdf,
  );

  const QRCodeContent = <QRCodeCom value={props.record}></QRCodeCom>;
  const FullQRCode = <div className="dfc fullFixed">{QRCodeContent}</div>;

  // if (isShowExportPdf) {
  //   console.log(' 111111111 ： ', QRCodeContent); //
  //   return (
  //     // <ExportPdf onClose={() => setIsShowExportPdf(!isShowExportPdf)}>
  //     <ExportPdf onClose={() => {}}>
  //       <div className="dfc fullFixed">{QRCodeContent}</div>
  //       sssssssssssssssssssssssssssssssssssssssssssssss
  //     </ExportPdf>
  //   );
  // }

  return (
    <div className="qrcodeWrapper">
      <div className="title">{props.title}</div>
      {QRCodeContent}
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
          {/* <a onClick={() => tips('暂未实现！')}>打印</a> */}
          {/* <a onClick={() => setIsShowExportPdf(!isShowExportPdf)}>打印</a> */}
          <a onClick={() => props.showExportPdf(FullQRCode)}>打印</a>
        </Button>
      </div>
    </div>
  );
};

QRCodeContent.defaultProps = {
  title: '默认标题',
};

export default QRCodeContent;
