import React, { useState, useEffect } from 'react';
import './style.less';
import { tips } from '@/utils';

const usePrintPdf = props => {
  const { goBack, onClose, noPrint, isPrintPdf, com } = props; //

  console.log(' ExportPdf usePrintPdf  ： ', props); //
  const iframeCom = <iframe id="iframe" className={`hide`}></iframe>;
  useEffect(() => {
    console.log(' ExportPdf useEffect  append ： ', props, isPrintPdf, noPrint); //
    // window.document.body.appendChild(`${<iframe id="iframe" className={`hide`} ></iframe>}`)
    let ele = document.createElement('iframe');
    ele.id = 'iframe';
    ele.className = 'hide';
    document.body.appendChild(ele);
  }, []);

  useEffect(() => {
    console.log(' ExportPdf useEffect ： ', props, isPrintPdf, noPrint); //
    if (!noPrint && isPrintPdf) {
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
  }, [isPrintPdf]);

  window.onafterprint = e => {
    console.log('    closecloseclose ： ', e);
    onClose();
  };

  return {
    iframeCom,
  };
  return <iframe id="iframe" className={`hide`}></iframe>;
};

export const ExportPdf = props => {
  console.log(
    ' %c ExportPdf 组件 this.state, this.props ： ',
    `color: #333; font-weight: bold`,
    props,
  ); //
  usePrintPdf(props);
  return <div className=""></div>;
};

export default usePrintPdf;
