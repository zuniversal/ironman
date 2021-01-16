import React, { useEffect, useRef } from 'react';
import './style.less';
// import ExportHeader from './ExportHeader';
import ReactDOM from 'react-dom';
import { Button } from 'antd';

const ExportPdf = props => {
  console.log(' ExportPdfExportPdf ： ', props); //
  const { goBack, onClose, noPrint, isExportPdf, com } = props; //
  const cusRef = useRef();
  const counterRef = React.useRef();
  // const print = () => {
  //   console.log(' printprint   ,   ： ',   )
  //   props.print()
  //   window.print();
  // }

  // useEffect(() => {
  //   console.log(' ExportPdf useEffect ： ', props, counterRef, counterRef.current); //
  //   if (!noPrint) {
  //     window.print();
  //   }
  // }, []);
  // }, [props.children, ]);

  const onLoad = () => {
    console.log(' ExportPdf onLoad   ,   ： ');
  };

  useEffect(() => {
    console.log(' ExportPdf useEffect ： ', props, isExportPdf, noPrint); //
    if (noPrint && isExportPdf) {
      const document = window.document;
      const iframe = window.frames[0];
      console.log(' ExportPdf document.head ： ', iframe, com); //
      iframe.document.head.innerHTML = document.head.innerHTML; // 获取当前文档的头部给iframe
      iframe.document.body.innerHTML = com?.innerHTML; // 把传过来的html给iframe <body>
      setTimeout(() => {
        console.log('  ExportPdf 延时器 ： ');
        iframe.window.print();
      }, 2000);
    }
  }, [isExportPdf]);

  window.onafterprint = e => {
    console.log('    closecloseclose ： ', e);
    onClose();
  };
  return <iframe id="iframe" className={`hide`} onLoad={onLoad}></iframe>;
  return ReactDOM.createPortal(
    <iframe id="iframe" className={`hide`}></iframe>,
    document.getElementsByTagName('body')[0],
  );
  return ReactDOM.createPortal(
    <div className={'exportPdfWrapper  '} ref={counterRef}>
      <div className={'exportPdf  '}>
        <div className="pdfContent">{props.children}</div>
        {/* <div className="pdfContent">{props.children}</div> */}
      </div>
    </div>,
    document.getElementById('root'),
  );
};

ExportPdf.defaultProps = {
  onClose: () => {},
};

export default ExportPdf;
