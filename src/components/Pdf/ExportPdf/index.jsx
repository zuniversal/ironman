import React, { useEffect, useRef } from 'react';
import './style.less';
// import ExportHeader from './ExportHeader';
import ReactDOM from 'react-dom';
import { Button } from 'antd';

const ExportPdf = props => {
  console.log(' ExportPdfExportPdf ： ', props); //
  const { goBack, onClose } = props; //
  const cusRef = useRef();
  const counterRef = React.useRef();
  // const print = () => {
  //   console.log(' printprint   ,   ： ',   )
  //   props.print()
  //   window.print();
  // }

  useEffect(() => {
    console.log(' ExportPdf useEffect ： ', counterRef, counterRef.current); //
    window.print();
  }, []);
  // }, [props.children, ]);

  window.onafterprint = e => {
    console.log('    closecloseclose ： ', e);
    onClose();
  };
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

ExportPdf.defaultProps = {};

export default ExportPdf;
